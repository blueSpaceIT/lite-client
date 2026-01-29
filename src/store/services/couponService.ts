import { baseApi } from "../api/baseApi";

export const couponService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        verifyCoupon: builder.mutation({
            query: (name) => {
                return {
                    url: `/coupons/${name}`,
                    method: "POST",
                };
            },
        }),
    }),
});
