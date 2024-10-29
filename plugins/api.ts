export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: nuxtApp.$config.public.apiUrl,
    onRequest({ request, options, error }) {},
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/sign-in"));
      }
    }
  });

  return {
    provide: {
      api
    }
  };
});
