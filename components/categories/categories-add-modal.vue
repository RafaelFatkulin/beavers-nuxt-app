<script lang="ts" setup>
import { type CreateCategory, createCategorySchema, useAddCategory } from '~/composables/categories/add-category';
import { useGetCategories } from "~/composables/categories/get-categories";

const modal = useModal()
const toast = useToast()

const state = reactive<CreateCategory>({
  title: '',
  description: '',
})

const { data, error, status, execute, clear } = await useAddCategory(state)
const { refresh } = await useGetCategories()

watch(state, () => clear())

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
    state.description = ''
    await modal.close()
    await refresh()
    clear()
  }
})
</script>

<template>
  <UModal
      v-model:open="modal.isOpen.value"
      description='Заполните данные для новой категории'
      title="Новая категория"
  >
    <UButton
        class="ml-auto"
        icon="i-lucide-badge-plus"
    >
      <span class="hidden sm:flex">Новая категория</span>
    </UButton>

    <template #body>
      <div class="space-y-6">
        <UAlert
            v-if="error"
            :description="error.data?.message"
            color="error"
            icon="i-lucide-badge-alert"
            title="Ошибка"
            variant="subtle"
        />

        <UForm
            :schema="createCategorySchema"
            :state
            class="space-y-4"
            @submit="execute"
        >
          <UFormField
              label="Название"
              name="title"
              required
          >
            <UInput v-model="state.title" class="w-full"/>
          </UFormField>
          <UFormField
              label="Описание"
              name="description"
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
              icon="i-lucide-badge-plus"
              type="submit"
          >
            Создать
          </UButton>
        </UForm>
      </div>
    </template>
  </UModal>
</template>