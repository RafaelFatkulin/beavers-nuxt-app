export const useNavigationLinks = () => {
    const items = useState('navigation-links', () => [
        {
            label: 'Главная',
            icon: 'i-heroicons-home',
            to: '/dashboard',
        },
        {
            label: 'Категории',
            icon: 'i-heroicons-squares-2x2',
            to: '/categories',
        },
        {
            label: 'Сотрудники',
            icon: 'i-heroicons-users',
            to: '/users',
        }
    ])

    return { items }
}