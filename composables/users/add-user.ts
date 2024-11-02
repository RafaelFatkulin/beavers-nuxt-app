import { z } from "zod";

export const createUserSchema = z.object({
    fullName: z.string({ required_error: 'Поле ФИО обязательно для заполнения' }).min(1, { message: 'Поле ФИО обязательно для заполнения' }),
    email: z
        .string({ required_error: 'Поле "Email" обязательно для заполнения' })
        .email({ message: "Некорректный Email" }),
    role: z.enum(['ADMIN', 'MANAGER', 'LOGISTICIAN'], {
        required_error: 'Поле Роль обязательно для заполнения'
    }).optional()
})

export type CreateUser = z.output<typeof createUserSchema>

export const useAddUser = (data: CreateUser) => {
    const nuxtApp = useNuxtApp()

    return useAsyncData<SuccessResponse<null>, ErrorResponse>(
        'add-user',
        async () => nuxtApp.$api('/users', {
            method: 'POST',
            body: data
        }),
        {
            immediate: false,
            dedupe: 'defer'
        }
    )
}