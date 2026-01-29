import { baseApi } from "../api/baseApi";

export const adminService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: () => {
                return {
                    url: "/admins/teams",
                    method: "GET",
                };
            },
            providesTags: ["admins"],
        }),
    }),
});
