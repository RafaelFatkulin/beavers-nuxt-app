<script setup lang="ts">
import {type UpdateUser, updateUserSchema, useUpdateUser} from "~/composables/users/update-user";
import {useGetUsers} from "~/composables/users/get-users";

const toast = useToast()

const roleOptions = ref([
  {label: "Администратор", value: "ADMIN"},
  {label: "Логист", value: "LOGISTICIAN"},
  {label: "Менеджер", value: "MANAGER"},
])

const {
  userToUpdate,
  state,
  updateUserToUpdate,
  isOpen,
  data,
  execute,
  clear,
  status,
  error
} = await useUpdateUser()

const {refresh} = await useGetUsers()

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

    state.email = undefined
    state.fullName = undefined
    state.role = undefined

    clear()
    updateUserToUpdate()
    await refresh()
  }
  if (status.value === 'error') {
    toast.add({
      title: 'Ошибка',
      description: error.value?.data?.message,
      color: 'error',
      icon: 'i-lucide-badge-alert',
      type: 'foreground'
    })
    clear()
    updateUserToUpdate()
    await refresh()
  }
})

</script>

<template>
  <UModal
      :open="isOpen"
      title="Редактирование сотрудника"
      @update:open="updateUserToUpdate()"
  >
    <template #body>
      <UForm
          :schema="updateUserSchema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit()"
      >
        <UFormField
            label="ФИО"
            name="fullName"
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

        <UButton
            :loading="status === 'pending'"
            class="w-full justify-center"
            icon="i-lucide-pencil"
            type="submit"
            label="Редактировать"
        />
      </UForm>
    </template>
  </UModal>
</template>