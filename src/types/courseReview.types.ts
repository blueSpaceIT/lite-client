import type { TCourse } from "./course.types";
import type { TUser } from "./user.types";

export type TCourseReview = {
    _id: string;
    id: string;
    course: Pick<TCourse, "_id" | "name">;
    student: Pick<TUser, "_id" | "name" | "image">;
    rating: number;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
