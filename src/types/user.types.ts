import { USER_ROLES } from "../constants";

export type TUserRole = keyof typeof USER_ROLES;

export type TGuardian = {
    name?: string;
    phone?: string;
};

export type TUser = {
    _id: string;
    id: string;
    name: string;
    phone: string;
    nid?: string;
    email?: string;
    address?: string;
    guardian?: TGuardian;
    school?: string;
    college?: string;
    university?: string;
    department?: string;
    district?: string;
    role: TUserRole;
    status: "Active" | "Inactive";
    image?: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
