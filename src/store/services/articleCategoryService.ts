import { baseApi } from "../api/baseApi";

export const articleCategoryService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getArticleCategories: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/article-categories",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["articleCategories"],
        }),
        getArticleCategory: builder.query({
            query: (id) => {
                return {
                    url: `/article-categories/${id}`,
                    method: "GET",
                };
            },
        }),
    }),
});
