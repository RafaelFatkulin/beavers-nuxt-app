export default defineNuxtRouteMiddleware((to, from) => {
  const { accessToken } = useAuth();

  if (!accessToken.value && to.name === "dashboard") {
    return navigateTo("/sign-in");
  }

  if (accessToken.value && to.name === "sign-in") {
    return navigateTo("/dashboard");
  }
});
