export type TCourseCategory = {
    _id: string;
    id: string;
    name: string;
    status: "Active" | "Inactive";
    image?: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
