<script lang="ts" setup>
import { updateCategorySchema, useUpdateCategory } from "~/composables/categories/update-category";
import { useGetCategories } from "~/composables/categories/get-categories";

const toast = useToast()

const {
  state,
  updateCategoryToUpdate,
  isOpen,
  data,
  execute,
  clear,
  status,
  error
} = await useUpdateCategory()

const { refresh } = await useGetCategories()

const onSubmit = async () => {
  await execute()
}

watch(state, () => {
  clear()
})

watchEffect(async () => {
  if (status.value === 'success') {
    toast.add({
      title: 'Успех',
      description: data.value?.message,
      color: 'success',
      icon: 'i-lucide-badge-check',
      type: 'foreground'
    })

    state.title = ''
    state.description = undefined

    clear()
    updateCategoryToUpdate()
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
    updateCategoryToUpdate()
    await refresh()
  }
})
</script>

<template>
  <u-modal
      :open="isOpen"
      title="Редактирование категории"
      @update:open="updateCategoryToUpdate()"
  >
    <template #body>
      <UForm
          :schema="updateCategorySchema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit()"
      >
        <UFormField
            label="Название"
            name="title"
        >
          <UInput
              v-model="state.title"
              class="w-full"
          />
        </UFormField>
        <UFormField
            label="Описание"
            name="description"
            required
        >
          <UTextarea
              v-model="state.description"
              autoresize
              class="w-full"
          />
        </UFormField>

        <UButton
            :loading="status === 'pending'"
            class="w-full justify-center"
            icon="i-lucide-pencil"
            label="Редактировать"
            type="submit"
        />
      </UForm>
    </template>
  </u-modal>
</template>