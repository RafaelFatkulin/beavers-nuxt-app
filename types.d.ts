type Role = "ADMIN" | "LOGISTICIAN" | "MANAGER"

type User = {
    id: number;
    fullName: string | null;
    email: string;
    phone: string | null;
    avatar: string | null;
    role: Role;
};

type SuccessResponse<T> = {
    data?: T;
    message?: string;
    success: boolean;
};

type ErrorResponse = {
    message: string;
    success: boolean;
};
