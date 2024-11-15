<script lang="ts" setup>
import { useGetUsers } from "~/composables/users/get-users";
import UsersFilters from "~/components/users/users-filters.vue";
import UsersAddModal from "~/components/users/users-add-modal.vue";
import DashboardTitle from "~/components/dashboard-title/dashboard-title.vue";

definePageMeta({
  layout: 'dashboard',
})

const { data } = await useGetUsers()
</script>

<template>
  <dashboard-page>
    <template #header>
      <dashboard-title>
        Пользователи
        <UBadge v-if="data?.data?.length" variant="subtle">{{ data?.data?.length }}</UBadge>
      </dashboard-title>

      <users-add-modal/>
    </template>

    <template #subheader>
      <users-filters/>
    </template>

    <users-table/>

  </dashboard-page>
</template>