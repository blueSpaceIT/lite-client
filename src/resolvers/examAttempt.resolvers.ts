import z from "zod";

const answerValidationSchema = z.object({
    question: z.string(),
    answer: z.string(),
});

const createMCQAndGAPExamAttemptValidationSchema = z.object({
    exam: z.string(),
    startTime: z.iso.datetime({ offset: true }),
    endTime: z.iso.datetime({ offset: true }),
    submitTime: z.iso.datetime({ offset: true }),
    type: z.enum(["MCQ", "GAP"]),
    answers: z.array(answerValidationSchema),
});

export const ExamAttemptResolvers = {
    createMCQAndGAPExamAttemptValidationSchema,
};
