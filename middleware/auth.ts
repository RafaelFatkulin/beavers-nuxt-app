export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to, from);
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return navigateTo("/sign-in");
  }
});
