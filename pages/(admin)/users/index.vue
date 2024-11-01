<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';
import { refDebounced } from "@vueuse/core";

definePageMeta({
  layout: 'dashboard',
})

const nuxtApp = useNuxtApp()

const search = ref<string>('')
const debouncedSearch = refDebounced<string>(search, 500)
const selectedRole = ref<Role | undefined>(undefined)

const roles = ref([
  {
    label: 'Все',
    value: 'ALL'
  },
  {
    label: 'Администратор',
    value: 'ADMIN'
  },
  {
    label: 'Логист',
    value: 'LOGISTICIAN'
  },
  {
    label: 'Менеджер',
    value: 'MANAGER'
  }
])

const { data, status, refresh, error } = await useAsyncData<SuccessResponse<User[]>, ErrorResponse>(
    'users',
    async () => nuxtApp.$api('/users', {
      query: {
        role: selectedRole.value,
        q: search.value
      }
    }),
    {
      transform: input => {
        return ({
          ...input,
          data: input.data?.map(user => ({
            ...user,
            avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}&background=random&format=svg`
          })) || []
        })
      }
    }
)

const { getCurrentUser, accessToken } = useAuth();

if (!accessToken.value) {
  await getCurrentUser();
  await refresh()
}

if (error.value) {
  await refresh()
}

watch([debouncedSearch, selectedRole], async () => {
  await refresh()
})

const UAvatar = resolveComponent("UAvatar")
const UBadge = resolveComponent("UBadge")

const colorByRole = (role: Role): string => {
  if (role === 'ADMIN') return 'warning'
  if (role === 'LOGISTICIAN') return 'success'
  return 'primary'
}

const translateRole = (role: Role) => {
  if (role === 'ADMIN') return 'Администратор'
  if (role === 'LOGISTICIAN') return 'Логист'
  return 'Менеджер'
}

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'id',
    header: '#'
  },
  {
    accessorKey: 'fullName',
    header: 'Имя',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, {
          src: row.original.avatar,
          size: 'lg'
        }),
        h('div', undefined, [
          h('p', { class: 'font-medium text-[var(--ui-text-highlighted)]' }, `${row.original.fullName}`),
          h('p', { class: '' }, `${row.original.email}`)
        ])
      ])
    }
  },
  {
    accessorKey: 'role',
    header: 'Роль',
    cell: ({ row }) => {
      return h(UBadge, {
        size: 'sm',
        color: colorByRole(row.original.role)
      }, () => `${translateRole(row.original.role)}`)
    }
  },
  {
    accessorKey: 'phone',
    header: 'Телефон',
    cell: ({ row }) => {
      return h('p', { class: 'text-gray-500 dark:text-gray-400 w-full' }, () => row.getValue('phone') || '—')
    }
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
      <div class="flex flex-row gap-4">
        <UInput
            v-model="search"
            :loading="status==='pending'"
            class="w-64"
            icon="i-heroicons-magnifying-glass"
            placeholder="Поиск по имени или e-mail"
        >
          <template v-if="search?.length" #trailing>
            <UButton
                aria-label="Очистить поле"
                color="neutral"
                icon="i-heroicons-x-circle"
                size="sm"
                variant="link"
                @click="search = ''"
            />
          </template>
        </UInput>
        <USelect
            v-model="selectedRole"
            :items="roles"
            :loading="status==='pending'"
            class="w-48"
            icon="i-heroicons-briefcase"
            placeholder="Должность"
        />
      </div>
    </template>

    <UTable
        :columns
        :data="data?.data"
        :loading="status==='pending'" :sticky="true" class="flex-1 h-screen">
      <template #empty>
        {{ error?.data?.message }}
      </template>
    </UTable>

    <span v-if="status === 'error'">
      {{ error?.data?.message }}
    </span>
  </dashboard-page>
</template>