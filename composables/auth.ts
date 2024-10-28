export const useAuth = () => {
  const authUser = useAuthUser();

  const accessToken = useState<string | null>("access_token", () => null);
  const refreshToken = useState<string | null>("refresh_token", () => null);

  accessToken.value = useCookie("access_token").value || "";
  refreshToken.value = useCookie("refresh_token").value || "";

  const setUser = (user: User) => {
    authUser.value = user;
  };

  const signIn = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const data = await $fetch<{
        data: { accessToken: string; refreshToken: string };
        message: string | null;
        success: boolean;
      }>("http://localhost:8000/auth/signin", {
        method: "POST",
        body: {
          email,
          password
        }
      });
      accessToken.value = data.data.accessToken;
      refreshToken.value = data.data.refreshToken;
      useCookie("access_token").value = data.data.accessToken;
      useCookie("refresh_token").value = data.data.refreshToken;

      navigateTo("/dashboard", {
        replace: true
      });

      return data;
    } catch (err) {
      console.log("@sign-in-error", err);
      return null;
    }
  };

  const getUser = async () => {
    if (!accessToken.value) return;
    const data = await $fetch<{
      data: User;
      message: string | null;
      success: boolean;
    }>("http://localhost:8000/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
    });
    setUser(data.data);
  };

  return {
    accessToken,
    refreshToken,
    authUser,
    signIn,
    getUser
  };
};
