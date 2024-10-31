export default {
    async login({ email, password }: { email: string; password: string }) {
        try {
            return await $fetch<{
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
        } catch (err) {
            throw new Error("Ошибка при входе");
        }
    },

    async getUser() {
        try {
            return await $fetch<SuccessResponse<User>>("/auth/me", {
                baseURL: "http://localhost:8000",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                },
            });
        } catch (err) {
            throw new Error("Ошибка при получении пользователя");
        }
    }
};
