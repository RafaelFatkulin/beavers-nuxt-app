export const useGetCategories = async () => {
    const nuxtApp = useNuxtApp()

    const response = await useAsyncData<
        SuccessResponse<Category[]>,
        ErrorResponse
    >(
        'categories',
        async () => nuxtApp.$api('/categories'),
        {
            immediate: true,
            dedupe: 'defer'
        }
    )

    return {
        ...response
    }
}