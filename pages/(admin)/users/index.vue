<script lang="ts" setup>
import { useGetUsers } from "~/composables/users/get-users";
import UsersFilters from "~/components/users/users-filters.vue";
import UsersAddModal from "~/components/users/users-add-modal.vue";

definePageMeta({
  layout: 'dashboard',
})

const { data } = await useGetUsers()
</script>

<template>
  <dashboard-page>
    <template #header>
      <h1 class="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0">
        Пользователи
        <UBadge v-if="data?.data?.length" variant="subtle">{{ data?.data?.length }}</UBadge>
      </h1>

      <users-add-modal/>
    </template>

    <template #subheader>
      <users-filters/>
    </template>

    <users-table/>

  </dashboard-page>
</template>