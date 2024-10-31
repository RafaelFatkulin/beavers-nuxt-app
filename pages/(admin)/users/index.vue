<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';

definePageMeta({
  layout: 'dashboard',
})

const nuxtApp = useNuxtApp()

const { data, status, refresh, error } = await useAsyncData<SuccessResponse<User[]>, ErrorResponse>(
    'users',
    async () => nuxtApp.$api('/users'),
)

const { getCurrentUser, accessToken } = useAuth();

if (!accessToken.value) {
  await getCurrentUser();
  await refresh()
}

if (error.value) {
  await refresh()
}

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'id',
    header: '#'
  },
  {
    accessorKey: 'avatar',
    header: '',
  },
  {
    accessorKey: 'fullName',
    header: 'Имя'
  },
  {
    accessorKey: 'role',
    header: 'Роль'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phone',
    header: 'Телефон'
  }
]
</script>

<template>
  <dashboard-page>
    <template #header>
      <h1 class="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0">
        Пользователи
      </h1>
    </template>

    <template #subheader>
      <h1 class="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white min-w-0">
        Тест
      </h1>
    </template>

    <UTable :columns :data="data?.data" :loading="status==='pending'" class="flex-1" sticky/>

    <span v-if="status === 'error'">
      {{ error?.data?.message }}
    </span>
  </dashboard-page>
</template>