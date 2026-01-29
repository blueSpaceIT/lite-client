import { baseApi } from "../api/baseApi";

export const sslcommerzService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (data) => {
                return {
                    url: "/sslcommerz/create-payment",
                    method: "POST",
                    body: data,
                };
            },
        }),
        verifyPayment: builder.query({
            query: (id) => {
                return {
                    url: `/sslcommerz/verify-payment/${id}`,
                    method: "GET",
                };
            },
        }),
    }),
});
