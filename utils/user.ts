export const translateRole = (role: Role | undefined) => {
    const roleTranslations: Record<Role, string> = {
        ADMIN: 'Администратор',
        LOGISTICIAN: 'Логист',
        MANAGER: 'Менеджер',
    };

    return role ? roleTranslations[role] : roleTranslations.MANAGER;
};

export const colorByRole = (role: Role): 'warning' | 'success' | 'primary' => {
    const roleColors: Record<
        Role,
        'warning' |
        'success' |
        'primary'
    > = {
        ADMIN: 'warning',
        LOGISTICIAN: 'success',
        MANAGER: 'primary'
    }
    return role ? roleColors[role] : roleColors.MANAGER
}
