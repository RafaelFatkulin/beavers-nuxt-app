// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: ["@nuxt/ui", "@pinia/nuxt"],
    runtimeConfig: {
        public: {
            apiUrl: "http://localhost:8000"
        }
    },
    icon: {
        clientBundle: {
            icons: [
                "heroicons:arrow-right-end-on-rectangle",
                "heroicons:arrow-right-start-on-rectangle",
                "heroicons:exclamation-circle",
                "heroicons:arrow-path",
                "heroicons:briefcase",
                "heroicons-magnifying-glass",
                "heroicons-x-circle",
            ]
        }
    },
});
