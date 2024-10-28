export default {
  async login({ email, password }: { email: string; password: string }) {
    try {
      const response = await $fetch<{
        data: {
          accessToken: string;
          refreshToken: string;
        };
        message: string | null;
        success: boolean;
      }>("/auth/signin", {
        method: "POST",
        body: {
          email,
          password
        },
        baseURL: "http://localhost:8000"
      });
      return response;
    } catch (err) {
      console.log("@err", err);
      throw new Error("Ошибка при входе");
    }
  },

  async getUser() {
    try {
      const response = await $fetch("/auth/me", {
        baseURL: "http://localhost:8000",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
        onResponseError: (error) => {
          error.response.status === 401;
        }
      });

      return response;
    } catch (err) {
      console.log("@err", err);
      throw new Error("Ошибка при получении пользователя");
    }
  }
};
