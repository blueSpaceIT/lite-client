import type { TBranch } from "./branch.types";

export type TAdminRole = "superAdmin" | "admin" | "moderator" | "teacher";

export type TAdmin = {
    _id: string;
    id: string;
    name: string;
    phone: string;
    password: string;
    otp: string;
    branch: TBranch;
    designation: string;
    quote?: string;
    nid?: string;
    address?: string;
    role: TAdminRole;
    status: "Active" | "Inactive";
    image?: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
