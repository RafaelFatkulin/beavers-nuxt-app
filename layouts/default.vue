<script lang="ts" setup>
import { ref } from "vue";

const { signOut, isLoggedIn } = useAuth();

const items = ref([
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
          v-if="isLoggedIn"
          class="w-fit"
          @click="signOut()"
      >
        <template #leading>
          <UIcon
              class="size-5"
              name="i-heroicons-arrow-right-start-on-rectangle"
          />
        </template>
        SignOut
      </UButton
      >
      <UButton
          v-else
          as="NuxtLink"
          class="w-fit"
          to="/sign-in"
      >
        <template #leading>
          <UIcon
              class="size-5"
              name="i-heroicons-arrow-right-end-on-rectangle"
          />
        </template>
        SignIn
      </UButton>
    </header>
    <main class="flex-1">
      <slot/>
    </main>
  </div>
</template>
