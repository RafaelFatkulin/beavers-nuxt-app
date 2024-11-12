import { useAsyncData } from "#app";

export const useGetUserById = async () => {
    const nuxtApp = useNuxtApp()
    const route = useRoute()

    const response = await useAsyncData<SuccessResponse<User>, ErrorResponse>(
        `user/${route.params.id}`,
        async () => nuxtApp.$api(`/users/${route.params.id}`),
        {
            lazy: true,
            immediate: true,
            dedupe: 'defer'
        }
    )

    return { ...response }
}