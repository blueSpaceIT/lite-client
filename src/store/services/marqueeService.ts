import { baseApi } from "../api/baseApi";

export const marqueeService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMarquee: builder.query({
            query: (id) => {
                return {
                    url: `/marquee/${id}`,
                    method: "GET",
                };
            },
            providesTags: ["marquee"],
        }),
    }),
});
