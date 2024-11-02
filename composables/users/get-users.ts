import { refDebounced } from "@vueuse/core";

export const useGetUsers = async () => {
    const nuxtApp = useNuxtApp()

    const search = useState<string>('users-search', () => '')
    const debouncedSearch = refDebounced<string>(search, 500)
    const selectedRole = useState<Role | undefined>('users-selected-role', () => undefined)

    const response = await useAsyncData<SuccessResponse<User[]>, ErrorResponse>(
        'users',
        async () => nuxtApp.$api('/users', {
            query: {
                role: selectedRole?.value,
                q: search?.value
            }
        }),
        {
            watch: [debouncedSearch, selectedRole],
            lazy: true,
            immediate: true,
            transform: input => {
                return ({
                    ...input,
                    data: input.data?.map(user => ({
                        ...user,
                        avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}&background=random&format=svg`
                    })) || []
                })
            },
            dedupe: 'defer'
        }
    )

    // watch([debouncedSearch, selectedRole], async () => {
    //     console.log('update')
    //     await response.refresh()
    // })

    return {
        search,
        selectedRole,
        ...response
    }
}