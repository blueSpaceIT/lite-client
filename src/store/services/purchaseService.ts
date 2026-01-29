import { baseApi } from "../api/baseApi";

export const purchaseService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPurchase: builder.mutation({
            query: (data) => {
                return {
                    url: "/purchases",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["myPurchases"],
        }),
        getMyPurchases: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/purchases/my-purchases",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["myPurchases"],
        }),
        getPurchase: builder.query({
            query: (id) => {
                return {
                    url: `/purchases/${id}`,
                    method: "GET",
                };
            },
        }),
        getValidPurchase: builder.query({
            query: (courseID) => {
                return {
                    url: `/purchases/${courseID}/my-course`,
                    method: "GET",
                };
            },
        }),
    }),
});
