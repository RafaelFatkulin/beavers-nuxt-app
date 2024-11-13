<script lang="ts" setup>
import { useGetUsers } from "~/composables/users/get-users";

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

const { status, search, selectedRole } = await useGetUsers()
</script>

<template>
  <div class="flex flex-row flex-1 gap-4 flex-wrap gap-y-2">
    <UInput
        v-model="search"
        :loading="status==='pending'"
        class="w-full sm:w-64"
        icon="i-heroicons-magnifying-glass"
        placeholder="Поиск по имени или e-mail"
    >
      <template v-if="search?.length" #trailing>
        <UButton
            aria-label="Очистить поле"
            color="neutral"
            icon="i-heroicons-x-circle"
            size="md"
            variant="link"
            @click="search = ''"
        />
      </template>
    </UInput>
    <USelect
        v-model="selectedRole"
        :items="roles"
        :loading="status==='pending'"
        class="w-full sm:w-48"
        icon="i-heroicons-briefcase"
        placeholder="Должность"
    />
  </div>
</template>

<style scoped>

</style>