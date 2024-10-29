<script setup lang="ts">
import { ref } from "vue";

const { signOut, isLoggedIn } = useAuth();

const items = ref([
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/"
  },
  {
    label: "Dashboard",
    icon: "i-heroicons-briefcase",
    to: "/dashboard",
    disabled: !isLoggedIn.value,
    hidden: !isLoggedIn.value
  }
]);
</script>

<template>
  <div class="flex flex-col min-h-screen px-4">
    <header class="py-2 flex flex-row items-center justify-between">
      <UNavigationMenu
        :items="items"
        class="justify-between"
        variant="link"
      />

      <UButton
        class="w-fit"
        @click="signOut()"
        v-if="isLoggedIn"
      >
        <template #leading>
          <UIcon name="i-heroicons-arrow-left-on-rectangle" />
        </template>
        SignOut</UButton
      >
      <UButton
        class="w-fit"
        v-else
        as="NuxtLink"
        to="/sign-in"
      >
        <template #leading>
          <UIcon name="i-heroicons-arrow-right-end-on-rectangle" />
        </template>
        SignIn
      </UButton>
    </header>
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
