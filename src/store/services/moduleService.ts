import { baseApi } from "../api/baseApi";

export const moduleService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getModules: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/modules",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["modules"],
        }),
        getModule: builder.query({
            query: (id) => {
                return {
                    url: `/modules/${id}`,
                    method: "GET",
                };
            },
        }),
    }),
});
