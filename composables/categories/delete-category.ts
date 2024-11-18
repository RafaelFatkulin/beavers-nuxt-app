export const useDeleteCategory = async () => {
    const nuxtApp = useNuxtApp()

    const categoryToDelete = useState<Category | null>('category-to-delete', () => null)
    const lastCategoryToDeleteTitle = useState<string | null>('last-category-to-delete-title', () => null)
    const isOpen = computed(() => !!categoryToDelete.value)

    watch(categoryToDelete, (newCategory) => {
        lastCategoryToDeleteTitle.value = newCategory?.title || null
    })

    const updateCategoryToDelete = (category?: Category) => {
        categoryToDelete.value = category || null
    }

    const response = await useAsyncData<SuccessResponse<null>, ErrorResponse>(
        'delete-category',
        async () => nuxtApp.$api(`/categories/${categoryToDelete.value?.id}`, {
            method: 'DELETE',
        }),
        {
            immediate: false,
            dedupe: 'defer'
        }
    )

    return {
        categoryToDelete,
        updateCategoryToDelete,
        isOpen,
        lastCategoryToDeleteTitle,
        ...response
    }
}