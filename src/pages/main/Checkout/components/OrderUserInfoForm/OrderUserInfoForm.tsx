import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../../../../components/common/Form/Form";
import { OrderResolvers } from "../../../../../resolvers/order.resolvers";
import InputField from "../../../../../components/common/Form/InputField";
import TextareaField from "../../../../../components/common/Form/TextareaField";
import FormButton from "../../../../../components/common/Form/FormButton";
import { useAppSelector } from "../../../../../store/hook";
import { useCurrentCart } from "../../../../../store/slices/cartSlice";
import type { TCreateOrder } from "../../../../../types";
import type z from "zod";
import { Radio } from "antd";
import toast from "react-hot-toast";

const areaOptions = [
    // {
    //     value: "Dhaka",
    //     label: "ইনসাইড ঢাকা (৳60 - বই পৌঁছে যাবে নিকটস্থ সুন্দরবন কুরিয়ারে)",
    // },
    // {
    //     value: "Dhaka Out",
    //     label: "আউটসাইড ঢাকা (৳100 - বই পৌঁছে যাবে নিকটস্থ সুন্দরবন কুরিয়ারে)",
    // },
    {
        value: "Dhaka",
        label: "৭০৳ (বই পৌঁছে যাবে আপনার নিকটস্থ সুন্দরবন কুরিয়ারে)",
    },
    // {
    //     value: "Dhaka Out",
    //     label: "ফ্রি (বই পৌঁছে আপনার নিকটস্থ সুন্দরবন কুরিয়ারে)",
    // },
];

type Props = {
    orderData: TCreateOrder;
    setOrderData: React.Dispatch<React.SetStateAction<TCreateOrder>>;
    setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

const OrderUserInfoForm = ({ orderData, setOrderData, setFormStep }: Props) => {
    const cart = useAppSelector(useCurrentCart);
    const defaultValues = {
        ...orderData,
    };

    type TCheckoutFromData = z.infer<
        typeof OrderResolvers.createOrderValidationSchema
    >;

    const checkoutHandler = (data: TCheckoutFromData) => {
        setOrderData((prev) => ({
            ...prev,
            name: data.name,
            phone: data.phone,
        }));
        if (data?.address) {
            setOrderData((prev) => ({
                ...prev,
                address: data.address,
            }));
        }
        if (
            orderData.orderType === "hardcopy" &&
            (!orderData?.area || !data?.address || data?.address === "")
        ) {
            toast.error("Address is required");
            return;
        }
        setFormStep(2);
    };

    return (
        <div>
            <h4 className="text-lg lg:text-xl mb-2">Delivery Section</h4>
            <p className="text-xs mb-6">Give your delivery info</p>

            <div>
                <Form<TCheckoutFromData>
                    defaultValues={defaultValues}
                    onSubmit={checkoutHandler}
                    resolver={zodResolver(
                        OrderResolvers.createOrderValidationSchema
                    )}
                >
                    <div className="grid gap-4">
                        <InputField
                            name="name"
                            placeholder="Name"
                            label="Name"
                        />
                        <InputField
                            name="phone"
                            placeholder="Phone"
                            label="Phone"
                        />
                        {cart[0].type === "hardcopy" ? (
                            <div>
                                <div className="mb-4">
                                    <TextareaField
                                        name="address"
                                        placeholder="Address"
                                        label="Address"
                                    />
                                </div>
                                <div className="flex justify-center items-center">
                                    <Radio.Group
                                        options={areaOptions}
                                        onChange={(e) => {
                                            setOrderData((prev) => ({
                                                ...prev,
                                                area: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        <FormButton>Next</FormButton>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default OrderUserInfoForm;
