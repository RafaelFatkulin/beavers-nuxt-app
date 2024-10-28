import { defineStore } from "pinia";
import auth from "~/services/auth";

export const useAuthStore = defineStore("auth", {
  state: (): { user: any; accessToken: string; refreshToken: string } => ({
    user: null,
    accessToken: "",
    refreshToken: ""
  }),
  actions: {
    async login({ email, password }: { email: string; password: string }) {
      const { data } = await auth.login({ email, password });
      console.log("@data", data);

      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
    },
    logout() {
      this.user = null;
      this.accessToken = "";
      this.refreshToken = "";
      localStorage.removeItem("access_token");
    },
    async getUser() {
      if (!this.accessToken) return;
      const data = await auth.getUser();
      this.user = data;
    }
  }
});
