<script lang="ts" setup>
import { useGetUsers } from "~/composables/users/get-users";
import { UButton } from "#components";
import type { ColumnDef, Row } from '@tanstack/vue-table'
import { colorByRole, translateRole } from "~/utils/user";
import UsersDeleteModal from "~/components/users/users-delete-modal.vue";
import { useDeleteUser } from "~/composables/users/delete-user";
import { useUpdateUser } from "~/composables/users/update-user";

const UAvatar = resolveComponent("UAvatar")
const UBadge = resolveComponent("UBadge")
const UDropdownMenu = resolveComponent("UDropdownMenu")

const { data, status, error } = await useGetUsers()

const { updateUserToDelete } = await useDeleteUser()
const { updateUserToUpdate } = await useUpdateUser()

const columns: ColumnDef<User>[] = [
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
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
          'div',
          { class: "text-right" },
          h(
              UDropdownMenu,
              {
                items: getRowItems(row),
              },
              () => [
                h(UButton, {
                  icon: 'i-lucide-ellipsis-vertical',
                  color: 'neutral',
                  variant: 'ghost',
                  class: 'ml-auto'
                })
              ]
          )
      )
    }
  }
]

function getRowItems(row: Row<User>) {
  return [
    [
      {
        type: 'label',
        label: 'Действия',
      }
    ],
    [
      {
        type: 'link',
        to: `/users/${row.original.id}`,
        label: 'Открыть',
        icon: 'i-lucide-eye'
      },
      {
        label: 'Редактировать',
        icon: 'i-lucide-pencil',
        onSelect: () => updateUserToUpdate(row.original)
      },
      {
        label: 'Удалить',
        color: 'error' as const,
        icon: 'i-lucide-trash',
        onSelect: () => updateUserToDelete(row.original)
      }
    ]
  ]
}

</script>

<template>
  <UTable
      :columns
      :data="data?.data"
      :loading="status==='pending'"
      class="flex-1 h-full"
      sticky
  >
    <template #empty>
      {{ error?.data?.message }}
    </template>
  </UTable>
  <users-update-modal/>
  <users-delete-modal/>
</template>