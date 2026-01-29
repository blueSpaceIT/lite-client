import { baseApi } from "../api/baseApi";

export const sliderService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSlider: builder.query({
            query: (id) => {
                return {
                    url: `/sliders/${id}`,
                    method: "GET",
                };
            },
            providesTags: ["sliders"],
        }),
    }),
});
