import { baseApi } from "../api/baseApi";

export const examAttemptService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createExamAttempt: builder.mutation({
            query: (data) => {
                return {
                    url: "/exam-attempts/mcq-attempt",
                    method: "POST",
                    body: data,
                };
            },
        }),
        createCQExamAttempt: builder.mutation({
            query: (data) => {
                return {
                    url: "/exam-attempts/cq-attempt",
                    method: "POST",
                    body: data,
                };
            },
        }),
        getExamAttempts: builder.query({
            query: (id) => {
                return {
                    url: `/exam-attempts/${id}`,
                    method: "GET",
                };
            },
            providesTags: ["examAttempts"],
        }),
        getExamAttempt: builder.query({
            query: ({ userID, examID }) => {
                return {
                    url: `/exam-attempts/${userID}/${examID}`,
                    method: "GET",
                };
            },
        }),
    }),
});
