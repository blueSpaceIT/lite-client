import { z } from "zod";

export const PayStationValidationSchema = z.object({
    totalAmount: z.number(),
    invoiceID: z.string(),
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    address: z.string(),
    type: z.enum(["purchase", "order"] as const),
    callbackURL: z.string().url(),
});

export const PayStationResolvers = {
    PayStationValidationSchema,
};