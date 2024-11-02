<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import { useGetUsers } from "~/composables/users/get-users";

const UAvatar = resolveComponent("UAvatar")
const UBadge = resolveComponent("UBadge")

const { data, status, error } = await useGetUsers()


const colorByRole = (role: Role): string => {
  const roleColors: Record<Role, string> = {
    ADMIN: 'warning',
    LOGISTICIAN: 'success',
    MANAGER: 'primary'
  }
  return roleColors[role]
}

const translateRole = (role: Role) => {
  const roleTranslations: Record<Role, string> = {
    ADMIN: 'Администратор',
    LOGISTICIAN: 'Логист',
    MANAGER: 'Менеджер',
  };

  return roleTranslations[role] || roleTranslations.MANAGER;
};
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
        variant: 'subtle',
        color: colorByRole(row.original.role)
      }, () => `${translateRole(row.original.role)}`)
    }
  },
  {
    accessorKey: 'phone',
    header: 'Телефон',
    cell: ({ row }) => {
      return h('p', { class: 'text-gray-500 dark:text-gray-400 w-full' }, `${row.original.phone ? row.original.phone : '—'}`)
    }
  },
]

</script>

<template>
  <UTable
      :columns
      :data="data?.data"
      :loading="status==='pending'"
      :sticky="true"
      class="flex-1 h-screen"
  >
    <template #empty>
      {{ error?.data?.message }}
    </template>
  </UTable>
</template>