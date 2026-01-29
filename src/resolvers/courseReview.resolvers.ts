import z from "zod";

const createCourseReviewValidationSchema = z.object({
    course: z.string(),
    student: z.string(),
    rating: z.number(),
    comment: z.string().min(1, "Comment cannot be empty"),
});

const updateCourseReviewValidationSchema = z.object({
    rating: z.number().optional(),
    comment: z.string().optional(),
    status: z
        .enum(["Approved", "Pending", "Rejected"], {
            message: "Status is invalid",
        })
        .optional(),
});

export const CourseReviewResolvers = {
    createCourseReviewValidationSchema,
    updateCourseReviewValidationSchema,
};
