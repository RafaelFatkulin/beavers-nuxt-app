<template>
  <UApp :toaster="{class: '!z-[100]', ui: {
    viewport: '!z-[100]',
    base: '!z-[100]',
  }}">
    <NuxtLayout>
      <NuxtLoadingIndicator/>
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>

<script lang="ts" setup></script>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

*,
*::before,
*::after {
  font-family: "Inter", sans-serif;
}

*::-webkit-scrollbar {
  background-color: transparent;
  height: .6em;
  width: .6em;
}

.dark *::-webkit-scrollbar-thumb:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--color-gray-600) / var(--tw-bg-opacity));
}

.dark *::-webkit-scrollbar-thumb {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--color-gray-700) / var(--tw-bg-opacity));
}

*::-webkit-scrollbar-thumb:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--color-gray-400) / var(--tw-bg-opacity));
}

*::-webkit-scrollbar-thumb {
  border-radius: .6em;
  --tw-bg-opacity: 1;
  background-color: rgb(var(--color-gray-300) / var(--tw-bg-opacity));
}

.dark *::-webkit-scrollbar-track {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--color-gray-800) / var(--tw-bg-opacity));
}

*::-webkit-scrollbar-track {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--color-gray-100) / var(--tw-bg-opacity));
}
</style>
