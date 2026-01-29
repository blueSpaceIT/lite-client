import type { TCourse } from "./course.types";
import type { TCourseContent } from "./courseContent.types";
import type { TUser } from "./user.types";

export type TAnswer = {
    question: string;
    answer: string;
};

export type TCQAnswer = {
    question: string;
    answer: string[];
};

export type TExamAttempt = {
    _id: string;
    course: TCourse;
    exam: TCourseContent;
    student: TUser;
    type: "MCQ" | "CQ" | "GAP";
    answers?: TAnswer[] | TCQAnswer[];
    right?: number;
    wrong?: number;
    sumbittedPDF?: string;
    totalMarks: number;
    obtainedMarks: number;
    isChecked: boolean;
    isPassed: boolean;
    isLive: boolean;
    startTime: Date;
    endTime: Date;
    submitTime: Date;
    createdAt?: Date;
    updatedAt?: Date;
};

export type TCreateExamAttempt = {
    exam: string;
    startTime: Date;
    endTime: Date;
    submitTime: Date;
    type: "MCQ" | "CQ" | "GAP";
    answers: TAnswer[] | TCQAnswer[];
};
