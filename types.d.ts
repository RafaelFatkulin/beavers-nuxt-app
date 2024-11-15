type Role = "ADMIN" | "LOGISTICIAN" | "MANAGER"

type User = {
    id: number;
    fullName: string | undefined;
    email: string;
    phone: string | null;
    avatar: string | null;
    role: Role;
};

type Category = {
    id: number;
    title: string;
    description: string;
}

type SuccessResponse<T> = {
    data?: T;
    message?: string;
    success: boolean;
};

type ErrorResponse = {
    message: string;
    success: boolean;
};
