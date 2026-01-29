import type { TAdmin } from "./admin.types";
import type { TUser } from "./user.types";

export type TMedia = {
    id: string;
    admin?: TAdmin;
    student?: TUser;
    url: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
