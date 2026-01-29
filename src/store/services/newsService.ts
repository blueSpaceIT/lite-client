import { baseApi } from "../api/baseApi";

export const newsService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNewses: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/news",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["news"],
        }),
        getNews: builder.query({
            query: (id) => {
                return {
                    url: `/news/${id}`,
                    method: "GET",
                };
            },
        }),
    }),
});
