<template>
  <UApp>
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
</style>
