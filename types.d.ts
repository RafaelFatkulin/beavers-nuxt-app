type User = {
  id: number;
  fullName: string | null;
  email: string;
  phone: string | null;
  avatar: string | null;
  role: "ADMIN" | "LOGISTICIAN" | "MANAGER";
};
