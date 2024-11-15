<script lang="ts" setup>
import DashboardTitle from "~/components/dashboard-title/dashboard-title.vue";

definePageMeta({
  layout: 'dashboard',
})

useHead({
  title: 'Категории',
  meta: [
    { name: 'description', content: 'Список категорий' },
    { name: 'keywords', content: 'категории, список' },
  ],
})
</script>

<template>
  <dashboard-page>
    <template #header>
      <dashboard-title>
        Категории
      </dashboard-title>

      <categories-add-modal/>
    </template>

    <categories-table/>
  </dashboard-page>
</template>