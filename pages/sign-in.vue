<script lang="ts" setup>
import { z } from "zod";

definePageMeta({
  layout: "auth",
});

const schema = z.object({
  email: z
      .string({ required_error: 'Поле "e-mail" обязательно для заполнения' })
      .email({ message: 'Некорректный e-mail' }),
  password: z
      .string({ required_error: 'Поле "пароль" обязательно для заполнения' })
      .min(8, { message: 'Поле "пароль" должно содержать не менее 8 символов' })
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
      <h1 class="text-lg font-semibold text-center">Авторизация</h1>
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
          label="Пароль"
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
          icon="i-lucide-log-in"
          label="Войти"
          type="submit"
      />
    </UForm>
  </UCard>
</template>
