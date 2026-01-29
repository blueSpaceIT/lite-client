import { baseApi } from "../api/baseApi";

export const newsCategoryService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNewsCategories: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/news-categories",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["newsCategories"],
        }),
        getNewsCategory: builder.query({
            query: (id) => {
                return {
                    url: `/news-categories/${id}`,
                    method: "GET",
                };
            },
        }),
    }),
});
