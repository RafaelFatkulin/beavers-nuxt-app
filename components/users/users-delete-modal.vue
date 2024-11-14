<script lang="ts" setup>
import { useDeleteUser } from "~/composables/users/delete-user";
import { useGetUsers } from "~/composables/users/get-users";

const toast = useToast()

const {
  data,
  status,
  error,
  execute,
  clear,
  updateUserToDelete,
  isOpen,
  lastUserToDeleteName
} = await useDeleteUser()

const { refresh } = await useGetUsers()

watchEffect(async () => {
  if (status.value === 'success') {
    console.log('Успех');
    toast.add({
      title: 'Успех',
      description: data.value?.message,
      color: 'success',
      icon: 'i-lucide-badge-check',
      type: 'foreground'
    });
    clear();
    updateUserToDelete();
    await refresh();
  }

  if (status.value === 'error') {
    console.log('Ошибка');
    toast.add({
      title: 'Ошибка',
      description: error.value?.data?.message,
      color: 'error',
      icon: 'i-lucide-badge-alert',
      type: 'foreground'
    });
    clear();
    updateUserToDelete();
    await refresh();
  }
});
</script>

<template>
  <UModal
      :open="isOpen"
      title="Удаление сотрудника"
      @update:open="updateUserToDelete()"
  >
    <template #body>
      <div class="space-y-4">
        <p>
          Вы действительно хотите удалить сотрудника
          <span
              class="font-bold text-[var(--ui-primary)]"
          >
            {{ lastUserToDeleteName }}
          </span>?
        </p>
      </div>
    </template>

    <template #footer>
      <UButton
          :loading="status === 'pending'"
          class="ml-auto min-w-24 justify-center"
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
          @click="updateUserToDelete()"
      />
    </template>
  </UModal>
</template>