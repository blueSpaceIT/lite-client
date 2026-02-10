import type { TData } from "../../types";
import type { IOfflineEnrollment } from "../../types/offlineEnrollment.types";
import { baseApi } from "../api/baseApi";

export const offlineEnrollmentService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentOfflineEnrollments: builder.query<TData<IOfflineEnrollment[]>, string>({
            query: (studentId) => {
                return {
                    url: `/offline-enrollments/student/${studentId}`,
                    method: "GET",
                };
            },
            providesTags: ["offline-enrollments"],
        }),
    }),
});

export const { useGetStudentOfflineEnrollmentsQuery } = offlineEnrollmentService;
