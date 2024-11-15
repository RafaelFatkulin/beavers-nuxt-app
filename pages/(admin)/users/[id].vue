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

        <dashboard-title v-if="status==='success'">
          {{ data?.data?.fullName }}
          <UBadge
              :color="colorByRole(data?.data?.role)"
              variant="subtle"
          >
            {{ translateRole(data?.data?.role) }}
          </UBadge>
        </dashboard-title>
        <span v-if="status === 'pending'">
          <USkeleton class="h-[24px] w-[240px]"/>
        </span>
      </div>
    </template>
  </dashboard-page>
</template>

<style scoped>

</style>