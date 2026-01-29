import type {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
} from "@reduxjs/toolkit/query";
import { baseQuery } from "./baseApi";
import type { RootState } from "../store";
import { setUser, signout } from "../slices/authSlice";

export const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 423) {
        api.dispatch(signout());
    }

    if (result.error?.status === 401) {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/auth/access-token/student`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        const refreshToken = await res.json();

        if (refreshToken?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch(
                setUser({
                    user,
                    token: refreshToken.data.accessToken,
                })
            );

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(signout());
        }
    }

    return result;
};
