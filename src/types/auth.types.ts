import type { TUser } from "./user.types";

export type TAuth = {
    phone: string;
    password: string;
};

export type TSigninResponse = {
    user: TUser;
    token: string;
};
