import { baseApi } from "../api/baseApi";

export const authService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (credentials) => {
                return {
                    url: "/auth/signin",
                    method: "POST",
                    body: credentials,
                };
            },
        }),
        getMe: builder.query({
            query: () => {
                return {
                    url: "/auth/me",
                    method: "GET",
                };
            },
        }),
        forgetPassword: builder.mutation({
            query: (data) => {
                return {
                    url: "/auth/forget-password/student",
                    method: "POST",
                    body: data,
                };
            },
        }),
        resetPassword: builder.mutation({
            query: ({ token, ...data }) => {
                return {
                    url: "/auth/reset-password/student",
                    method: "POST",
                    body: data,
                    headers: {
                        authorization: token,
                    },
                };
            },
        }),
    }),
});
