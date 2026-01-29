import type { TBatch } from "./batch.types";
import type { TBranch } from "./branch.types";
import type { TCoupon } from "./coupon.types";
import type { TCourse } from "./course.types";
import type { TUser } from "./user.types";

export type TPurchaseData = {
    name: string;
    phone: string;
    email: string;
    course: string;
    price: number;
    coupon?: string;
    discount?: number;
};

export type TPaymentDetails = {
    method: "Cash" | "SSLCommerz" | "Bkash" | "Nagad" | "Rocket";
    amount: number;
    account?: string;
    trxID?: string;
    paidAt?: Date;
};

export type TPurchase = {
    _id: string;
    id: string;
    student: TUser;
    course: TCourse;
    batch?: TBatch;
    branch: TBranch;
    status: "Active" | "Pending" | "Course Out";
    payStatus: "Paid" | "Pending" | "Partial" | "Refunded";
    price: number;
    subtotal: number;
    discount: number;
    totalAmount: number;
    paidAmount: number;
    paymentDetails?: TPaymentDetails[];
    discountReason?: string;
    coupon?: TCoupon;
    expiredAt: Date;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
