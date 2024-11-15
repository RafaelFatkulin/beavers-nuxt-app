// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxt/eslint"],
    eslint: {
        config: {
            stylistic: true,
        },
        checker: true
    },
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
                "heroicons:magnifying-glass",
                "heroicons:x-circle",
                "heroicons:user-plus",
                "lucide:ellipsis-vertical",
                "lucide:pencil",
                "lucide:eye",
                "lucide:trash",
                "lucide:chevron-left",
            ],
            scan: true,
        },
        serverBundle: {
            collections: [
                'lucide', 'heroicons'
            ]
        }
    },
});