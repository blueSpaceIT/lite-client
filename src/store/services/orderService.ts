import { baseApi } from "../api/baseApi";

export const orderService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => {
                return {
                    url: "/orders",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["myOrders"],
        }),
        getMyOrders: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/orders/my-orders",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["myOrders"],
        }),
        getMyEbooks: builder.query({
            query: () => {
                return {
                    url: "/orders/my-ebooks",
                    method: "GET",
                };
            },
            providesTags: ["myEbooks"],
        }),
        getOrder: builder.query({
            query: (id) => {
                return {
                    url: `/orders/${id}`,
                    method: "GET",
                };
            },
        }),
        getValidOrder: builder.query({
            query: (id) => {
                return {
                    url: `/orders/${id}/my-order`,
                    method: "GET",
                };
            },
        }),
    }),
});
