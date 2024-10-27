<script setup lang="ts">
import { z } from "zod";

definePageMeta({
  layout: "auth"
});

const schema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
});

type Schema = z.infer<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: "",
  password: ""
});

const toast = useToast();

const signIn = async () => {
  return await $fetch<{
    success: boolean;
    message: string;
    data: { accessToken: string; refreshToken: string };
  }>("http://localhost:8000/auth/signin", {
    method: "POST",
    body: state
  })
    .then((res) => {
      if (res.success) {
        toast.add({
          title: "Success",
          description: "Вы успешно вошли в систему",
          color: "success"
        });
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        navigateTo("/dashboard", { replace: true });
      }
    })
    .catch((err) => {
      toast.add({
        title: "Error",
        description: err.response._data.message,
        color: "error"
      });
    });
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  await signIn();
}
</script>

<template>
  <UContainer>
    <UCard class="min-w-[420px]">
      <template #header>
        <h1>Sign In</h1>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Email"
          name="email"
        >
          <UInput
            v-model="state.email"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Password"
          name="password"
        >
          <UInput
            v-model="state.password"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit"> Sign In </UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>
