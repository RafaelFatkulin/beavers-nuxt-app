export const useDeleteUser = async () => {
    const nuxtApp = useNuxtApp()

    const userToDelete = useState<User | null>('user-to-delete', () => null)
    const lastUserToDeleteName = useState<string | null>('last-user-to-delete-name', () => null)
    const isOpen = computed(() => !!userToDelete.value)

    watch(userToDelete, (newUser) => {
        lastUserToDeleteName.value = newUser?.fullName || null;
    });

    const updateUserToDelete = (user?: User) => {
        userToDelete.value = user || null;
    }

    const response = await useAsyncData<
        SuccessResponse<null>,
        ErrorResponse
    >(
        'delete-user',
        async () => nuxtApp.$api(`/users/${userToDelete.value?.id}`, {
            method: 'DELETE',
        }),
        {
            immediate: false,
            dedupe: 'defer'
        }
    )

    return {
        userToDelete,
        updateUserToDelete,
        isOpen,
        lastUserToDeleteName,
        ...response,
    }
}