<script lang="ts" setup>
const { user, signOut } = useAuth()

const items = ref([
  [
    {
      slot: 'header',
      type: 'label',
      label: user.value?.fullName,
    },
  ],
  [
    {
      label: 'Настройки',
      icon: 'i-lucide-settings',
      to: '/settings'
    }
  ],
  [
    {
      label: 'Выйти',
      icon: 'i-lucide-log-out',
      onSelect: async () => await signOut()
    }
  ]
])
</script>

<template>
  <u-dropdown-menu :items="items">
    <u-button
        :label="user?.fullName"
        class="justify-between"
        color="neutral"
        trailing-icon="i-lucide-ellipsis-vertical"
        variant="ghost"
    />

    <template #header>
      <div class="flex flex-row gap-2 items-center">
        <div class="flex flex-col">
          <span class="font-medium">{{ user?.fullName }}</span>
          <span class="font-normal text-[var(--ui-neutral-500)] text-xs">{{ user?.email }}</span>
        </div>
        <color-mode-toggler/>
      </div>
    </template>
  </u-dropdown-menu>
</template>