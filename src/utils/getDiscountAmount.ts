import type { TCoupon } from "../types";

const getDiscountAmount = (price: number, coupon: TCoupon) => {
    const discount =
        coupon.discount.type === "Fixed"
            ? coupon.discount.amount
            : Math.round((price * coupon.discount.amount) / 100);
    return discount >= price ? 0 : discount;
};

export default getDiscountAmount;
