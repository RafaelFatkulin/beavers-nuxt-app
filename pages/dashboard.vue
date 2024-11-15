<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});

const nuxtApp = useNuxtApp();

const { user, getCurrentUser, accessToken } = useAuth();

const { data, status, refresh, error } = await useAsyncData<
    SuccessResponse<
        {
          id: number;
          title: string;
          description: string;
        }[]
    >,
    ErrorResponse
>("categories", async () => nuxtApp.$api("/categories"));

if (!accessToken.value) {
  await getCurrentUser();
  await refresh()
}

if (error.value) {
  await refresh()
}
</script>

<template>
  <dashboard-page>
    <template #header>
      <dashboard-title>Главная</dashboard-title>
    </template>

    <div class="p-4">
      <ul v-if="status === 'success'">
        <li
            v-for="category in data?.data"
            :key="category.id"
        >
          {{ category.id }} - {{ category.title }}
        </li>
      </ul>

      <span v-if="status === 'pending'">Loading...</span>

      <span v-if="status === 'error'">
      {{ error?.data?.message }}
    </span>
    </div>
  </dashboard-page>
</template>
