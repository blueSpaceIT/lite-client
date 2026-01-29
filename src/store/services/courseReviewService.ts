import { baseApi } from "../api/baseApi";

export const courseReviewService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCourseReview: builder.mutation({
            query: (data) => {
                return {
                    url: "/course-reviews",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["courseReviews"],
        }),
        getCourseReviews: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/course-reviews",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["courseReviews"],
        }),
        getMyCourseReview: builder.query({
            query: (id) => {
                return {
                    url: `/course-reviews/${id}/me`,
                    method: "GET",
                };
            },
        }),
    }),
});
