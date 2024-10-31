<script lang="ts" setup>
import { ref } from "#imports";

const items = ref([
  {
    label: 'Главная',
    icon: 'i-heroicons-home',
    to: '/dashboard',
  },
  {
    label: 'Категории',
    icon: 'i-heroicons-squares-2x2',
    children: [
      {
        label: 'Добавить',
        icon: 'i-heroicons-plus-circle',
        to: '/categories/create',
      },
      {
        label: 'Список',
        icon: 'i-heroicons-list-bullet',
        to: '/categories',
      },
    ]
  },
  {
    label: 'Пользователи',
    icon: 'i-heroicons-users',
    children: [
      {
        label: 'Добавить',
        icon: 'i-heroicons-user-plus',
        to: '/users/create',
      },
      {
        label: 'Список',
        icon: 'i-heroicons-list-bullet',
        to: '/users',
      },
    ]
  }
])
</script>

<template>
  <aside class="p-4 border-r border-[var(--ui-border)] flex flex-col gap-4">
    <NuxtLink class="font-semibold px-3 transition-colors hover:text-[var(--ui-primary)]" to="/dashboard">
      Beavers
    </NuxtLink>
    <UNavigationMenu :items orientation="vertical"/>
  </aside>
</template>