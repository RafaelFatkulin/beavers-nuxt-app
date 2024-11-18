<script lang="ts" setup>
import { useDeleteCategory } from "~/composables/categories/delete-category";
import { useGetCategories } from "~/composables/categories/get-categories";

const router = useRouter()
const toast = useToast()

const {
  data,
  status,
  error,
  execute,
  clear,
  updateCategoryToDelete,
  isOpen,
  lastCategoryToDeleteTitle
} = await useDeleteCategory()
const { data: categoriesData, page, refresh, updatePage } = await useGetCategories()

watchEffect(async () => {
  if (status.value === 'success') {
    toast.add({
      title: 'Успех',
      description: data.value?.message,
      color: 'success',
      icon: 'i-lucide-badge-check',
      type: 'foreground'
    })

    if (categoriesData.value?.data?.length === 1) {
      updatePage(page.value ? page.value - 1 : 1)
    }

    clear()
    updateCategoryToDelete()
    await refresh()
  }

  if (status.value === 'error') {
    toast.add({
      title: 'Ошибка',
      description: error.value?.data?.message,
      color: 'error',
      icon: 'i-lucide-badge-alert',
      type: 'foreground'
    });
    clear();
    updateCategoryToDelete();
    await refresh();
  }
})
</script>

<template>
  <u-modal
      :open="isOpen"
      title="Удаление категории"
      @update:open="updateCategoryToDelete()"
  >
    <template #body>
      <div class="space-y-4">
        <p>
          Вы действительно хотите удалить категорию
          <span
              class="font-bold text-[var(--ui-primary)]"
          >
            {{ lastCategoryToDeleteTitle }}
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
          @click="updateCategoryToDelete()"
      />
    </template>
  </u-modal>
</template>
