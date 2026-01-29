import { baseApi } from "../api/baseApi";

export const courseService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/courses",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["courses"],
        }),
        getFreeCourses: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/courses/free",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["free-courses"],
        }),
        getCourse: builder.query({
            query: (id) => {
                return {
                    url: `/courses/${id}`,
                    method: "GET",
                };
            },
        }),
    }),
});
