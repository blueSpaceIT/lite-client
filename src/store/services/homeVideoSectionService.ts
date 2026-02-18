import { baseApi } from "../api/baseApi";

export const homeVideoSectionService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHomeVideoSections: builder.query({
            query: () => ({
                url: "/home-video-sections",
                method: "GET",
            }),
            providesTags: ["home-video-sections"],
        }),
    }),
});

export const { useGetHomeVideoSectionsQuery } = homeVideoSectionService;
