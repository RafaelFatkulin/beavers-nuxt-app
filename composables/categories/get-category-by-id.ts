export const useGetCategoryById = async () => {
    const nuxtApp = useNuxtApp()
    const route = useRoute()

    const response = await useAsyncData<
        SuccessResponse<Category>,
        ErrorResponse
    >(
        `/category/${route.params.id}`,
        async () => nuxtApp.$api(`/categories/${route.params.id}`),
        {
            lazy: true,
            immediate: true,
            dedupe: 'defer'
        }
    )

    return {
        ...response
    }
}