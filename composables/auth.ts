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
  const { $api } = useNuxtApp();

  const {
    public: { apiUrl }
  } = useRuntimeConfig();

  const signIn = ({
    email,
    password
  }: {
    email: ComputedRef<string | undefined>;
    password: ComputedRef<string | undefined>;
  }) => {
    return useAsyncData<
      SuccessResponse<{
        accessToken: string;
        refreshToken: string;
        user: User;
      }>,
      ErrorResponse
    >(
      "sign-in",
      () =>
        $api("/auth/signin", {
          baseURL: apiUrl,
          method: "POST",
          body: {
            email: email.value,
            password: password.value
          }
        }),
      { immediate: false }
    );
  };

  const refresh = async () => {
    console.log("whoo");
    const response = await useAsyncData<
      SuccessResponse<{ accessToken: string; refreshToken: string }>,
      ErrorResponse
    >(
      "refresh",
      () =>
        $api("/auth/refresh", {
          baseURL: apiUrl,
          method: "POST",
          body: {
            refreshToken: refreshToken.value
          }
        }),
      { immediate: true }
    );
    console.log("@response", response);

    return response;
  };

  const getCurrentUser = async () => {
    return await $api<{
      data: User;
      message: string;
      success: boolean;
    }>("/auth/me", {
      baseURL: apiUrl,
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      },
      onResponse({ request, response, options }) {
        if (response.ok && response._data) {
          updateUser(response._data.data);
        }
      }
    });
  };

  const signOut = async () => {
    const response = await $api<{
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
    isLoggedIn,
    refresh,
    getCurrentUser
  };
};
