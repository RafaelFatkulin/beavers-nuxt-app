import { z } from "zod";

export const updateCategorySchema = z.object({
    title: z
        .string({ required_error: 'Поле "Название" обязательно к заполнению' })
        .min(3, { message: 'Минимальная длина поля "Название" - 3 символа' }),
    description: z.string().optional(),
})

export type UpdateCategory = z.output<typeof updateCategorySchema>

export const useUpdateCategory = async () => {
    const nuxtApp = useNuxtApp()

    const categoryToUpdate = useState<Category | null>('category-to-update', () => null)
    const isOpen = computed(() => !!categoryToUpdate.value)

    const state = reactive<UpdateCategory>({
        title: '',
        description: undefined,
    })

    const updateCategoryToUpdate = (category?: Category) => {
        categoryToUpdate.value = category || null
    }

    watchEffect(() => {
        state.title = categoryToUpdate.value?.title || ''
        state.description = categoryToUpdate.value?.description || undefined
    })

    const response = await useAsyncData<SuccessResponse<Category>, ErrorResponse>(
        'update-category',
        async () => nuxtApp.$api(`/categories/${categoryToUpdate.value?.id}`, {
            method: 'PATCH',
            body: state,
        }),
        {
            immediate: false,
            dedupe: 'defer',
        }
    )

    return {
        state,
        categoryToUpdate,
        updateCategoryToUpdate,
        isOpen,
        ...response
    }
}