<script lang="ts" setup>
import { type CreateUser, createUserSchema, useAddUser } from "~/composables/users/add-user";
import { useGetUsers } from "~/composables/users/get-users";

const open = ref(false)
const toast = useToast()

const state = reactive<CreateUser>({
  email: '',
  fullName: '',
  role: undefined
})

const roleOptions = ref([
  { label: "Администратор", value: "ADMIN" },
  { label: "Логист", value: "LOGISTICIAN" },
  { label: "Менеджер", value: "MANAGER" },
])

const { data, error, status, execute, clear } = await useAddUser(state)
const { refresh, search, selectedRole } = await useGetUsers()

const onSubmit = async () => {
  await execute()
}

watch(state, () => {
  clear()
})

watchEffect(async () => {
  if (status.value === 'success') {
    toast.add({
      title: "Успех",
      description: data.value?.message,
      color: 'success',
      icon: 'i-lucide-badge-check',
      type: 'foreground'
    })

    state.email = ''
    state.fullName = ''
    state.role = undefined

    selectedRole.value = undefined
    search.value = ''

    open.value = false
    await refresh()
    clear()
  }
})

</script>

<template>
  <UModal
      v-model:open="open"
      class="!max-w-[400px]"
      description='После создания сотрудника на указанную почту придет письмо с данными для входа'
      title="Новый сотрудник"
  >
    <UButton icon="i-heroicons-user-plus" label="Новый пользователь"/>

    <template #body>
      <div class="space-y-6">
        <UAlert
            v-if="error"
            :description="error.data?.message"
            color="error"
            icon="i-heroicons-exclamation-triangle"
            title="Ошибка"
            variant="subtle"
        />
        <UForm :schema="createUserSchema" :state="state" class="space-y-4" @submit="onSubmit()">
          <UFormField
              label="ФИО"
              name="fullName"
              required
          >
            <UInput v-model="state.fullName" class="w-full"/>
          </UFormField>
          <UFormField
              label="Email"
              name="email"
              required
          >
            <UInput v-model="state.email" class="w-full"/>
          </UFormField>
          <UFormField
              help="Если оставить пустым будет автоматически выбрана роль менеджера"
              hint="Необязательное поле"
              label="Роль"
              name="role"
          >
            <USelect v-model="state.role" :items="roleOptions" class="w-full"/>
          </UFormField>

          <UButton :loading="status === 'pending'" class="w-full justify-center" icon="i-heroicons-user-plus"
                   type="submit">
            Создать
          </UButton>
        </UForm>
      </div>
    </template>
  </UModal>
</template>