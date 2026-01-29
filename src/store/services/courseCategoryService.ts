import { baseApi } from "../api/baseApi";

export const courseCategoryService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourseCategories: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/course-categories",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["courseCategories"],
        }),
        getCourseCategory: builder.query({
            query: (id) => {
                return {
                    url: `/course-categories/${id}`,
                    method: "GET",
                };
            },
        }),
    }),
});
