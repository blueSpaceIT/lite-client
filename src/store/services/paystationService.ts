import { baseApi } from "../api/baseApi";

export const paystationServics = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (data) => {
                return {
                    url: "/payment/create-payment", // Assuming mounted under /paystation; adjust if different
                    method: "POST",
                    body: data,
                };
            },
        }),
        verifyPayment: builder.mutation({ // Using mutation since backend is POST
            query: (data) => { // data: { invoice_number: string }
                return {
                    url: `/payment/verify-payment`,
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});