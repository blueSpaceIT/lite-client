import type z from "zod";
import { CouponResolvers } from "../../../../../resolvers/coupon.resolvers";
import type {
    TCoupon,
    TCourse,
    TData,
    TPurchaseData,
} from "../../../../../types";
import Form from "../../../../../components/common/Form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../../../components/common/Form/InputField";
import { FaTag } from "react-icons/fa6";
import { Button } from "@headlessui/react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../../../store/hook";
import { useCurrentUser } from "../../../../../store/slices/authSlice";
import { couponService } from "../../../../../store/services/couponService";
import getDiscountAmount from "../../../../../utils/getDiscountAmount";

type TCouponResponse = {
    loading: boolean;
    isDiscount: boolean;
    message: string;
};

type Props = {
    course: TCourse;
    purchaseData: TPurchaseData;
    setPurchaseData: React.Dispatch<React.SetStateAction<TPurchaseData>>;
    couponResponse: TCouponResponse;
    setCouponResponse: React.Dispatch<React.SetStateAction<TCouponResponse>>;
    setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

const CouponForm = ({
    course,
    purchaseData,
    setPurchaseData,
    couponResponse,
    setCouponResponse,
    setFormStep,
}: Props) => {
    const user = useAppSelector(useCurrentUser);
    const couponDefaultValues = {
        name: "",
    };

    type TVerifyCouponFromData = z.infer<
        typeof CouponResolvers.verifyCouponValidationSchema
    >;

    const [verifyCoupon] = couponService.useVerifyCouponMutation();

    const verifyCouponHandler = async (data: TVerifyCouponFromData) => {
        setCouponResponse((prev) => ({
            ...prev,
            loading: true,
        }));

        const result = await verifyCoupon(data.name);
        if (result?.error) {
            return setCouponResponse((prev) => ({
                ...prev,
                loading: false,
                message: "Invalid coupon",
            }));
        }

        if (result?.data as TData<TCoupon>) {
            setCouponResponse((prev) => ({
                ...prev,
                loading: false,
                isDiscount: true,
                message: "",
            }));

            return setPurchaseData((prev) => ({
                ...prev,
                coupon: result?.data.data.id,
                discount: getDiscountAmount(
                    purchaseData.price,
                    result?.data.data
                ),
            }));
        }
    };

    return (
        <div className="border border-primary rounded-xl p-3 lg:p-5">
            <h5 className="lg:text-xl font-bold pb-3 border-b border-[#6B706C]">
                {course.name}
            </h5>

            <div className="flex justify-between items-center gap-2 text-sm lg:text-lg py-3 border-b border-[#6B706C]">
                <p>Course Price</p>
                <p className="text-right">
                    {course.offerPrice ? course.offerPrice : course.price} টাকা
                </p>
            </div>

            <div className="flex justify-between items-center gap-2 text-sm lg:text-lg py-3">
                <p>Discount</p>
                <p className="text-primary text-right">
                    - {purchaseData?.discount || 0} BDT
                </p>
            </div>

            {purchaseData.price > 0 && (
                <div
                    className={`text-sm lg:text-lg py-3 border-b border-[#6B706C] ${
                        couponResponse.isDiscount ? "hidden" : ""
                    }`}
                >
                    <Form<TVerifyCouponFromData>
                        onSubmit={verifyCouponHandler}
                        defaultValues={couponDefaultValues}
                        resolver={zodResolver(
                            CouponResolvers.verifyCouponValidationSchema
                        )}
                    >
                        <div className="flex items-end gap-2">
                            <div>
                                <InputField
                                    name="name"
                                    placeholder="XXXXXXX"
                                    label={
                                        <div className="flex items-center gap-1 text-xs text-green-600">
                                            <FaTag />
                                            <span>Add Promocode</span>
                                        </div>
                                    }
                                />
                            </div>
                            <Button
                                type="submit"
                                className="rounded-lg bg-primary px-4 py-2.5 text-sm text-white cursor-pointer"
                                disabled={couponResponse.loading}
                            >
                                {couponResponse.loading ? (
                                    <Spin
                                        indicator={<LoadingOutlined spin />}
                                        size="small"
                                    />
                                ) : (
                                    "Apply"
                                )}
                            </Button>
                        </div>
                        {couponResponse.message && (
                            <p className="text-sm mt-1.5 text-red-700">
                                {couponResponse.message}
                            </p>
                        )}
                    </Form>
                </div>
            )}

            <div className="flex justify-between items-center gap-2 text-sm lg:text-lg py-3">
                <p>Total Payment:</p>
                <p className="text-primary text-right">
                    {purchaseData.price - (purchaseData?.discount || 0)} BDT
                </p>
            </div>

            <div className="flex justify-center">
                <Button
                    onClick={() => setFormStep(user?.phone ? 5 : 2)}
                    className={
                        "rounded bg-primary px-4 py-1.5 text-sm text-white cursor-pointer"
                    }
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default CouponForm;
