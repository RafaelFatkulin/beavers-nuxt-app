<script setup lang="ts">
import { z } from "zod";
import auth from "~/services/auth";

definePageMeta({
  layout: "auth",
  middleware: ["auth"]
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

const { signIn } = useAuth();

const toast = useToast();

async function onSubmit() {
  await signIn({
    email: state.email || "",
    password: state.password || ""
  });
}
</script>

<template>
  <UContainer>
    <UCard class="mx-auto w-full max-w-[420px]">
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
