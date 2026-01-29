export type TArticleCategory = {
    _id: string;
    id: string;
    name: string;
    description: string;
    status: "Active" | "Inactive";
    image?: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
