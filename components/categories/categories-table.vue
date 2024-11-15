<script lang="ts" setup>

import { useGetCategories } from "~/composables/categories/get-categories";
import type { ColumnDef, Row } from "@tanstack/vue-table";
import { UButton } from "#components";

const UDropdownMenu = resolveComponent("UDropdownMenu")

const { data, status, error } = await useGetCategories()

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: '#'
  },
  {
    accessorKey: 'title',
    header: 'Название'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
          'div',
          { class: 'text-right' },
          h(
              UDropdownMenu,
              {
                items: getRowItems(row)
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

function getRowItems(row: Row<Category>) {
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
        to: `/categories/${row.original.id}`,
        label: 'Открыть',
        icon: 'i-lucide-eye'
      },
      {
        label: 'Редактировать',
        icon: 'i-lucide-pencil',
        onSelect: () => {}
      },
      {
        label: 'Удалить',
        color: 'error' as const,
        icon: 'i-lucide-trash',
        onSelect: () => {}
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
</template>

<style scoped>

</style>