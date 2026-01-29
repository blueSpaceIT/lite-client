import { Button } from "@headlessui/react";
import { Radio } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type z from "zod";
import { OrderResolvers } from "../../../../../resolvers/order.resolvers";
import type { PayStationResolvers } from "../../../../../resolvers/PayStationResolvers";
import { orderService } from "../../../../../store/services/orderService";
import { paystationServics } from "../../../../../store/services/paystationService";
import type {
    TCreateOrder,
    TData,
    TError,
    TOrder,
} from "../../../../../types";
import type { IPayStationInitiateResponse } from "../../../../../types/IPayStationInitiateResponse";

type Props = {
    orderData: TCreateOrder;
    setOrderData: React.Dispatch<React.SetStateAction<TCreateOrder>>;
};

const OrderPaymentForm = ({ orderData, setOrderData }: Props) => {
    const navigate = useNavigate();
    // const cart = useAppSelector(useCurrentCart);
    const [loading, setLoading] = useState<boolean>(false);

    const payOptions = [
        // {
        //     value: "Cash On Delivery",
        //     label: "ক্যাশ অন ডেলিভারি",
        //     disabled: cart[0].type === "ebook",
        // },
        { value: "Payment Gateway", label: "PayStation" },
    ];

    type TCheckoutFromData = z.infer<
        typeof OrderResolvers.createOrderValidationSchema
    >;

    type TCreatePaymentData = z.infer<
        typeof PayStationResolvers.PayStationValidationSchema
    >;

    const [createOrder] = orderService.useCreateOrderMutation();
    const [createPayment] = paystationServics.useCreatePaymentMutation();

    const checkoutHandler = async (data: TCheckoutFromData) => {
        setLoading(true);

        if (
            data.orderType === "hardcopy" &&
            (!data?.area || !data?.address || data?.address === "")
        ) {
            toast.error("Address is required");
            return setLoading(false);
        }

        if (orderData.payMethod !== "Payment Gateway") {
            toast.error("PayStation is required");
            return setLoading(false);
        }

        const result = await createOrder(data);
        if (result?.error) {
            toast.error((result?.error as TError)?.data?.message);
            setLoading(false);
        }

        if (result?.data as TData<TOrder>) {
            setLoading(false);
            if (result.data.data.payMethod === "Payment Gateway") {
                const paymentData: TCreatePaymentData = {
                    totalAmount: result.data.data.totalAmount,
                    invoiceID: result.data.data.id,
                    name: result.data.data.name,
                    phone: result.data.data.phone,
                    address: result.data.data?.address || "Dhaka",
                    email: result.data.data.email || "", // Ensure email is passed
                    type: "order",
                    callbackURL: `${
                        import.meta.env.VITE_FRONTEND_URL
                    }/paystation/order`, // Adjust based on backend callback handling
                };

                const payResult = await createPayment(paymentData);
                if (payResult?.error) {
                    toast.error((payResult?.error as TError)?.data?.message);
                }

                if (payResult?.data as TData<IPayStationInitiateResponse>) {
                    const paymentURL = payResult.data.data.payment_url;
                    toast.success("Redirecting to payment gateway...");
                    window.location.href = paymentURL;
                }
            } else {
                navigate("/order/success", {
                    replace: true,
                    state: { order: result.data.data },
                });
            }
        }
    };

    return (
        <div>
            <h4 className="text-lg lg:text-xl border-b border-slate-400 pb-2 mb-5">
                পেমেন্ট মেথড
            </h4>

            <div>
                <div className="mb-4">
                    <Radio.Group
                        options={payOptions}
                        value={orderData.payMethod}
                        onChange={(e) => {
                            setOrderData((prev) => ({
                                ...prev,
                                payMethod: e.target.value,
                            }));
                        }}
                    />
                </div>
                <Button
                    onClick={() => checkoutHandler(orderData)}
                    className={`w-full rounded-lg bg-primary px-4 py-2.5 text-sm text-white cursor-pointer ${
                        loading ? "pointer-events-none" : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Pay Now"}
                </Button>
            </div>
        </div>
    );
};

export default OrderPaymentForm;
