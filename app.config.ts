export default defineAppConfig({
    ui: {
        colors: {
            primary: 'blue',
            neutral: 'zinc'
        },
        button: {
            slots: {
                base: "cursor-pointer"
            }
        },
        navigationMenu: {
            slots: {
                link: 'cursor-pointer'
            }
        },
        toast: {
            slots: {
                root: '!z-[500]',
                wrapper: '!z-[500]',
            }
        },
        modal: {
            slots: {
                description: "text-pretty",
                title: "text-pretty",
            }
        },
    }
});
