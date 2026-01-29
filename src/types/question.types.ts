import type { TAdmin } from "./admin.types";
import type { TTag } from "./tag.types";

export type TMCQQuestion = {
    _id: string;
    id: string;
    type: "MCQ";
    question: string;
    options: string[];
    answer: string;
    explaination?: string;
    tags?: TTag[];
    createdBy: TAdmin;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type TCQQuestion = {
    _id: string;
    id: string;
    type: "MCQ";
    question: string;
    answer: string;
    explaination?: string;
    tags?: TTag[];
    createdBy: TAdmin;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type TGAPQuestion = {
    _id: string;
    id: string;
    type: "MCQ";
    question: string;
    answer: string[];
    explaination?: string;
    tags?: TTag[];
    createdBy: TAdmin;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
