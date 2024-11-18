export const useGetCategories = async () => {
    const nuxtApp = useNuxtApp();
    const route = useRoute();

    const page = useState<number>('categories-page', () =>
        Number(route.query?.page) || 1
    );
    const updatePage = (value: number) => {
        page.value = value;
    };

    const url = computed(() => {
        const params = new URLSearchParams();
        if (page.value) {
            params.set('page', String(page.value));
        }
        return params.toString();
    });

    const response = await useAsyncData<
        SuccessResponse<Category[]>,
        ErrorResponse
    >(
        'categories',
        async () => nuxtApp.$api(`/categories?${url.value}`),
        {
            lazy: true,
            immediate: true,
            dedupe: 'defer',
            watch: [page],
        }
    );

    return {
        page,
        updatePage,
        ...response,
    };
};
