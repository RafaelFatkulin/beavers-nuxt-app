<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"]
});

console.log("dashboard opened");

onBeforeMount(() => {
  console.log("dashboard mounted");
});

const { user, getCurrentUser, accessToken } = useAuth();

watch(accessToken, async () => await getCurrentUser());

const { $api } = useNuxtApp();

const { data, status } = useAsyncData<
  SuccessResponse<
    {
      id: number;
      title: string;
      description: string;
    }[]
  >,
  ErrorResponse
>(
  "all-categories",
  () => $api("/categories", { baseURL: "http://localhost:8000" }),
  { immediate: true, watch: [user] }
);
</script>

<template>
  <h1>Dashboard page {{ user?.fullName }}</h1>

  <ul v-if="status === 'success'">
    <li v-for="category in data?.data">
      {{ category.id }} - {{ category.title }}
    </li>
  </ul>

  <span v-if="status === 'pending'">Loading...</span>
</template>
