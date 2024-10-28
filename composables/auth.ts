export const useAuth = () => {
  const authUser = useAuthUser();

  const accessToken = useState<string | null>("access_token", () => null);
  const refreshToken = useState<string | null>("refresh_token", () => null);

  accessToken.value = useCookie("accessToken").value || "";
  refreshToken.value = useCookie("refreshToken").value || "";

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
        credentials: "include",
        body: {
          email,
          password
        }
      });
      accessToken.value = useCookie("accessToken").value || "";
      refreshToken.value = useCookie("refreshToken").value || "";

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
