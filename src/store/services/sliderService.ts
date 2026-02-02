import { baseApi } from "../api/baseApi";

export const sliderService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSlider: builder.query({
            query: () => {
                return {
                    url: `/sliders`,
                    method: "GET",
                };
            },
            providesTags: ["sliders"],
        }),
    }),
});
