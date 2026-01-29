import { baseApi } from "../api/baseApi";

export const lectureService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createLecture: builder.mutation({
            query: (data) => {
                return {
                    url: "/course-contents/create-lecture",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["lectures", "courseContents"],
        }),
        getLectures: builder.query({
            query: (data) => {
                const params = new URLSearchParams();
                if (data?.length > 0) {
                    data.forEach((item: [string, string]) => {
                        params.append(item[0], item[1]);
                    });
                }

                return {
                    url: "/course-contents/lectures",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["lectures", "courseContents"],
        }),
        getLecture: builder.query({
            query: (id) => {
                return {
                    url: `/course-contents/lectures/${id}`,
                    method: "GET",
                };
            },
        }),
        updateLecture: builder.mutation({
            query: ({ id, ...data }) => {
                return {
                    url: `/course-contents/lectures/${id}/update`,
                    method: "PATCH",
                    body: data,
                };
            },
            invalidatesTags: ["lectures", "courseContents"],
        }),
        deleteLecture: builder.mutation({
            query: (id) => {
                return {
                    url: `/course-contents/lectures/${id}/delete`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["lectures", "courseContents"],
        }),
    }),
});
