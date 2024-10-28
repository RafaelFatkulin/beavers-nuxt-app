<script setup lang="ts">
import { ref } from "vue";

const items = ref([
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/"
  },
  {
    label: "Dashboard",
    icon: "i-heroicons-briefcase",
    to: "/dashboard"
  },
  {
    label: "Sign In",
    icon: "i-heroicons-arrow-left-on-rectangle",
    to: "/sign-in"
  }
]);
</script>

<template>
  <div class="flex flex-col min-h-screen px-4">
    <header class="py-2">
      <UNavigationMenu
        :items="items"
        class="justify-between"
        variant="link"
      />
    </header>
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
