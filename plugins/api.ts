export default defineNuxtPlugin((nuxtApp) => {
  const { accessToken, refreshToken, refresh, updateCookies, updateUser } =
    useAuth();

  const api = $fetch.create({
    baseURL: nuxtApp.$config.public.apiUrl,
    credentials: "include",
    onRequest({ request, options, error }) {
      if (accessToken.value) {
        options.headers.set("Authorization", `Bearer ${accessToken.value}`);
      }
    },
    async onResponseError({ request, response, error }) {
      if (response.status === 401 && refreshToken.value) {
        console.log("hello");

        const { data, error, execute } = await refresh();
        await execute();
        console.log("@response", response);

        if (!error) {
          updateCookies({
            at: data.value?.data?.accessToken || "",
            rt: data.value?.data?.refreshToken || ""
          });
        }

        if (error) {
          updateCookies({ at: "", rt: "" });
          updateUser(null);
          return navigateTo("/");
        }
      }
      return Promise.reject(error);
    }
  });

  return {
    provide: {
      api
    }
  };
});
