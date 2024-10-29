import { useLocalStorage } from "@vueuse/core";
import { server } from "./../node_modules/next-auth/client/__tests__/helpers/mocks.d";
export const useAuth = () => {
  const accessToken = useCookie("access_token");
  const refreshToken = useCookie("refresh_token");
  const user = useCookie<User | null>("user");
  const isLoggedIn = computed(() => !!user.value);

  const updateCookies = ({ at, rt }: { at: string; rt: string }) => {
    accessToken.value = at;
    refreshToken.value = rt;
  };

  const updateUser = (value: User | null) => {
    user.value = value;
  };

  const toast = useToast();

  const {
    public: { apiUrl }
  } = useRuntimeConfig();

  const signIn = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    const response = await $fetch<{
      data: { accessToken: string; refreshToken: string; user: User };
    }>("/auth/signin", {
      baseURL: apiUrl,
      method: "POST",
      body: {
        email,
        password
      }
    });

    if (!response) {
      return navigateTo("/sign-in");
    }

    if (response.data) {
      updateCookies({
        at: response.data.accessToken,
        rt: response.data.refreshToken
      });
      updateUser(response.data.user);
    }

    return navigateTo("/dashboard");
  };

  const signOut = async () => {
    const response = await $fetch<{
      data: { accessToken: string; refreshToken: string; user: User };
      message: string;
      success: boolean;
    }>("/auth/signout", {
      baseURL: apiUrl,
      method: "POST",
      body: {
        refreshToken: refreshToken.value
      }
    });

    if (!response) {
      return;
    }

    if (response.message) {
      toast.add({
        title: response.message,
        color: "success"
      });

      updateCookies({ at: "", rt: "" });
      updateUser(null);
      return navigateTo("/");
    }
  };

  return {
    accessToken,
    refreshToken,
    signIn,
    updateCookies,
    user,
    updateUser,
    signOut,
    isLoggedIn
  };
};
