import { z } from "zod";

const SSLCommerzValidationSchema = z.object({
    totalAmount: z.number(),
    invoiceID: z.string(),
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    type: z.enum(["purchase", "order"]),
    callbackURL: z.string(),
});

export const SSLCommerzResolvers = {
    SSLCommerzValidationSchema,
};
