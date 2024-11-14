import {z} from 'zod';

export const updateUserSchema = z.object({
    fullName: z.string({ required_error: 'Поле ФИО обязательно для заполнения' }).optional(),
    email: z
        .string({ required_error: 'Поле "Email" обязательно для заполнения' })
        .email({ message: "Некорректный Email" }).optional(),
    role: z.enum(['ADMIN', 'MANAGER', 'LOGISTICIAN'], {
        required_error: 'Поле Роль обязательно для заполнения'
    }).optional()
})

export type UpdateUser = z.output<typeof updateUserSchema>

export const useUpdateUser = async () => {
    const nuxtApp = useNuxtApp()

    const userToUpdate = useState<User | null>('user-to-update', () => null)
    const isOpen = useState<boolean>('update-user-modal-state', () => false)

    const state = reactive<UpdateUser>({
        email: undefined,
        fullName: undefined,
        role: undefined,
    })

    watchEffect(() => {
        isOpen.value = !!userToUpdate.value
    })

    const updateUserToUpdate = (user?: User) => {
        userToUpdate.value = user || null
    }

    watchEffect(() => {
        state.email = userToUpdate.value?.email || undefined
        state.fullName = userToUpdate.value?.fullName || undefined
        state.role = userToUpdate.value?.role || undefined
    })

    const response = await useAsyncData<SuccessResponse<User>, ErrorResponse>(
        'update-user',
        async () => nuxtApp.$api(`/users/${userToUpdate.value?.id}`, {
            method: 'PATCH',
            body: state
        }),
        {
            immediate: false,
            dedupe: 'defer'
        }
    )

    return {
        state,
        userToUpdate,
        updateUserToUpdate,
        isOpen,
        ...response
    }
}