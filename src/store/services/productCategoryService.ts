import { baseApi } from "../api/baseApi";

export const productCategoryService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductCategories: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/product-categories",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["productCategories"],
        }),
        getProductCategory: builder.query({
            query: (id) => {
                return {
                    url: `/product-categories/${id}`,
                    method: "GET",
                };
            },
        }),
    }),
});
