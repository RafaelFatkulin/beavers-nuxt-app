<script lang="ts" setup>

import { useGetCategories } from "~/composables/categories/get-categories";
import type { ColumnDef, Row } from "@tanstack/vue-table";
import { UButton } from "#components";
import { useDeleteCategory } from "~/composables/categories/delete-category";
import { useUpdateCategory } from "~/composables/categories/update-category";

const UDropdownMenu = resolveComponent("UDropdownMenu")

const { data, status, error, page, updatePage } = await useGetCategories()
const { updateCategoryToDelete } = await useDeleteCategory()
const { updateCategoryToUpdate } = await useUpdateCategory()

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
        onSelect: () => updateCategoryToUpdate(row.original)
      },
      {
        label: 'Удалить',
        color: 'error' as const,
        icon: 'i-lucide-trash',
        onSelect: () => updateCategoryToDelete(row.original)
      }
    ]
  ]
}

function to(page: number) {
  return {
    query: {
      page
    }
  }
}
</script>

<template>
  <UTable
      :columns
      :data="data?.data"
      :loading="status==='pending'"
      class="flex-1"
      sticky
  >
    <template #empty>
      {{ error?.data?.message }}
    </template>
  </UTable>

  <UPagination
      v-if="data?.meta"
      v-model:page="page"
      :disabled="status === 'pending'"
      :per-page="data?.meta?.limit"
      :to="to"
      :total="data?.meta?.total"
      class="my-2 p-4 w-fit"
      @update:page="updatePage"
  />

  <categories-delete-modal/>
  <categories-update-modal/>
</template>