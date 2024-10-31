export default defineNuxtRouteMiddleware((to, from) => {
    const { accessToken } = useAuth();

    if (accessToken.value && (to.path === "/sign-in" || to.path === "/")) {
        return navigateTo("/dashboard");
    }

    if (!accessToken.value && to.path !== "/sign-in") {
        return navigateTo("/sign-in");
    }
});
