<script lang="ts" setup>
import { useDeleteUser } from "~/composables/users/delete-user";
import { useGetUsers } from "~/composables/users/get-users";

const toast = useToast()

const modal = useModal()

const { data, status, error, execute, clear, userToDelete, updateUserToDelete } = await useDeleteUser()
const { refresh } = await useGetUsers()

const handleClose = async () => {
  updateUserToDelete()
  await modal.close()
}

watch(modal.isOpen, (n, o) => {
  console.log(`current - ${n}`, `previous - ${o}`)
})

watchEffect(async () => {
  if (status.value === 'success') {
    console.log('success')
    await handleClose()

    toast.add({
      title: 'Успех',
      description: data.value?.message,
      color: 'success',
      icon: 'i-lucide-badge-check',
      type: 'foreground'
    })

    clear()
    await refresh()
  }

  if (status.value === 'error') {
    console.log('error')
    await handleClose()

    toast.add({
      title: 'Ошибка',
      description: error.value?.data?.message,
      color: 'error',
      icon: 'i-lucide-badge-alert',
      type: 'foreground'
    })

    clear()
    await refresh()
  }
})
</script>

<template>
  <UModal
      :open="modal.isOpen.value"
      title="Удаление сотрудника"
      update:open
  >
    <template #description>
      Вы действительно хотите удалить сотрудника
      <span
          class="font-bold text-[var(--ui-primary)]"
      >
        {{ userToDelete?.fullName }}
      </span>?
    </template>
    <template #footer>
      <UButton
          :loading="status === 'pending'"
          class="ml-auto"
          color="error"
          icon="i-lucide-trash"
          label="Да"
          @click="execute()"
      />
      <UButton
          :loading="status === 'pending'"
          color="neutral"
          icon="i-lucide-ban"
          label="Отмена"
          @click="handleClose()"
      />
    </template>
  </UModal>
</template>

<style scoped>

</style>