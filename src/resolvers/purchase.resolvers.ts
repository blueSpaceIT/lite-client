import z from "zod";

// payment details validation
const paymentDetailsValidationSchema = z.object({
    method: z.enum(["Cash", "Bkash", "Nagad", "Rocket"], {
        message: "Method is invalid",
    }),
    amount: z.number(),
    account: z.string().optional(),
    trxID: z.number().optional(),
});

// create purchase validation
const createPurchaseValidationSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    phone: z
        .string()
        .min(11, { message: "Phone should be 11 digit" })
        .max(11, { message: "Phone should be 11 digit" }),
    course: z.string(),
    batch: z.string().optional(),
    price: z.number(),
    coupon: z.string().optional(),
    discountReason: z.string().optional(),
    discount: z.number().optional(),
    paymentDetails: z.array(paymentDetailsValidationSchema).optional(),
});

export const PurchaseResolvers = {
    createPurchaseValidationSchema,
};
