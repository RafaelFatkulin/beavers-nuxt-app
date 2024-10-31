<script lang="ts" setup>
import { z } from "zod";

definePageMeta({
  layout: "auth",
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

const email = computed(() => state.email);
const password = computed(() => state.password);

const toast = useToast();
const router = useRouter();

const { signIn, updateCookies, updateUser } = useAuth();

const { data, status, error, clear, execute } = signIn({
  email,
  password
});

watch(status, (value) => {
  if (value === "success") {
    updateCookies({
      at: data.value?.data?.accessToken || "",
      rt: data.value?.data?.refreshToken || ""
    });
    updateUser(data.value?.data?.user || null);
    toast.add({
      title: "Добро пожаловать!"
    });
    router.push("/dashboard");
  }
  if (value === "error") {
    toast.add({
      title: "Ошибка",
      description: error.value?.data?.message,
      color: "error",
      icon: "i-heroicons-exclamation-circle"
    });
    clear();
  }
});
</script>

<template>
  <UCard class="mx-auto w-full max-w-[420px]">
    <template #header>
      <h1 class="text-lg font-semibold text-center">Sign In</h1>
    </template>

    <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="execute"
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

      <UButton
          :loading="status === 'pending' || status === 'success'"
          class="w-full items-center justify-center"
          type="submit"
      >
        <template #leading>
          <UIcon
              v-if="status !== 'pending'"
              class="size-5"
              name="i-heroicons-arrow-right-end-on-rectangle"
          />
        </template>
        <template #default> Sign In</template>
      </UButton>
    </UForm>
  </UCard>
</template>
