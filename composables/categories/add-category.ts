import { z } from "zod";

export const createCategorySchema = z.object({
    title: z
        .string({ required_error: 'Поле "Название" обязательно к заполнению' })
        .min(3, { message: 'Минимальная длина поля "Название" - 3 символа' }),
    description: z.string().optional(),
})

export type CreateCategory = z.output<typeof createCategorySchema>

export const useAddCategory = (data: CreateCategory) => {
    const nuxtApp = useNuxtApp()

    return useAsyncData<SuccessResponse<null>, ErrorResponse>(
        'add-category',
        async () => nuxtApp.$api('/categories', {
            method: 'POST',
            body: data,
        }),
        {
            immediate: false,
            dedupe: 'defer'
        }
    )
}