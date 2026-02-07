import { baseApi } from "../api/baseApi";

export const paystationServics = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (data) => ({
        url: "/payment/create-payment",
        method: "POST",
        body: data,
      }),
    }),

    verifyPayment: builder.mutation({
      query: (data) => ({
        url: `/payment/verify-payment`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreatePaymentMutation, useVerifyPaymentMutation } =
  paystationServics;
