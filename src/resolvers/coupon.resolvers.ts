import z from "zod";

// verify coupon validation
const verifyCouponValidationSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
});

export const CouponResolvers = {
    verifyCouponValidationSchema,
};
