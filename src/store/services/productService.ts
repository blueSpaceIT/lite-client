import { baseApi } from "../api/baseApi";

export const productService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/products",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["products"],
        }),
        getProduct: builder.query({
            query: (id) => {
                return {
                    url: `/products/${id}`,
                    method: "GET",
                };
            },
        }),
    }),
});
