<script lang="ts" setup>
import { useGetUserById } from "~/composables/users/get-user-by-id";
import { colorByRole, translateRole } from "~/utils/user";

definePageMeta({
  layout: 'dashboard',
})

const { data, status } = await useGetUserById()
</script>

<template>
  <dashboard-page>
    <template #header>
      <div class="flex flex-row items-center gap-2">
        <UTooltip text="Вернуться назад">
          <UButton
              color="neutral"
              icon="i-lucide-chevron-left"
              to="/users"
              variant="link"
          />
        </UTooltip>

        <h1 v-if="status==='success'"
            class="flex items-center capitalize gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0">
          {{ data?.data?.fullName }}
          <UBadge
              :color="colorByRole(data.data?.role)"
              variant="subtle"
          >
            {{ translateRole(data?.data?.role) }}
          </UBadge>
        </h1>
        <span v-if="status === 'pending'">
          <USkeleton class="h-[24px] w-[240px]"/>
        </span>
      </div>
    </template>
  </dashboard-page>
</template>

<style scoped>

</style>