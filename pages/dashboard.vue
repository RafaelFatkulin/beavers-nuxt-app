<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"]
});

console.log("dashboard opened");

onBeforeMount(() => {
  console.log("dashboard mounted");
});

const { user } = useAuth();
console.log(user.value);
</script>

<template>
  <h1>Dashboard page {{ user?.fullName }}</h1>
</template>
