<script lang="ts" setup>
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: () => colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
})
</script>

<template>
  <ClientOnly>
    <UButton
        :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
        aria-label="Тема"
        color="neutral"
        variant="ghost"
        @click="isDark = !isDark"
    />

    <template #fallback>
      <div class="w-8 h-8"/>
    </template>
  </ClientOnly>
</template>

<style scoped>

</style>