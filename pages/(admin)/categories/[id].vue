<script lang="ts" setup>
import { useGetCategoryById } from "~/composables/categories/get-category-by-id";

definePageMeta({
  layout: 'dashboard',
})

const { data, status } = await useGetCategoryById()
const pageTitle = computed(() => data.value?.data?.title || 'Категория')
useHead({
  title: () => pageTitle.value,
  meta: [
    { name: 'description', content: 'Список категорий' },
    { name: 'keywords', content: 'категории, список' },
  ],
})
</script>

<template>
  <dashboard-page>
    <template #header>
      <div class="flex flex-row items-center gap-2">
        <UTooltip text="Вернуться назад">
          <UButton
              color="neutral"
              icon="i-lucide-chevron-left"
              to="/categories"
              variant="link"
          />
        </UTooltip>

        <dashboard-title v-if="status==='success'">
          {{ data?.data?.title }}
        </dashboard-title>
        <span v-if="status === 'pending'">
          <USkeleton class="h-[24px] w-[240px]"/>
        </span>
      </div>
    </template>
    <div class="flex flex-col gap-4 p-4">
      <p class="max-w-[760px]">{{ data?.data?.description }}</p>
    </div>
  </dashboard-page>
</template>