import { baseApi } from "../api/baseApi";

export const branchService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBranches: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/branches",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["branches"],
        }),
    }),
});
