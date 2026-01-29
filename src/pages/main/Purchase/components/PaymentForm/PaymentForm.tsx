import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type z from "zod";
import Form from "../../../../../components/common/Form/Form";
import FormButton from "../../../../../components/common/Form/FormButton";
import InputField from "../../../../../components/common/Form/InputField"; // Assuming this component exists based on the pattern
import RadioField from "../../../../../components/common/Form/RadioField";
import type { PayStationResolvers } from "../../../../../resolvers/PayStationResolvers";
import { paystationServics } from "../../../../../store/services/paystationService";
import { purchaseService } from "../../../../../store/services/purchaseService";
import type {
    TData,
    TError,
    TPurchase,
    TPurchaseData, // Assuming you've defined this type
} from "../../../../../types";
import type { IPayStationInitiateResponse } from "../../../../../types/IPayStationInitiateResponse";


type Props = {
    purchaseData: TPurchaseData;
};

const PaymentForm = ({ purchaseData }: Props) => {
    const navigate = useNavigate();
    const defaultValues = {
        method:
            purchaseData.price === 0
                ? "Free"
                : ("PayStation" as "Free" | "PayStation"),
        email: purchaseData.email || "",
    };

    type TCreatePurchaseFromData = {
        method: "Free" | "PayStation";
        email: string;
    };

    type TCreatePaymentData = z.infer<
        typeof PayStationResolvers.PayStationValidationSchema
    >;

    const [createPurchase] = purchaseService.useCreatePurchaseMutation();
    const [createPayment] = paystationServics.useCreatePaymentMutation();

    const createPurchaseHandler = async (data: TCreatePurchaseFromData) => {
        const toastId = toast.loading("Wait a while");

        if (data.method === "PayStation" && !data.email) {
            toast.error("Email is required for PayStation", { id: toastId });
            return;
        }

        const result = await createPurchase({
            ...purchaseData,
            branch: "online",
        });
        if (result?.error) {
            toast.error((result?.error as TError)?.data?.message, {
                id: toastId,
            });
        }

        if (result?.data as TData<TPurchase>) {
            if (data.method === "PayStation") {
                const paymentData: TCreatePaymentData = {
                    totalAmount: result.data.data.totalAmount,
                    invoiceID: result.data.data._id,
                    name: purchaseData.name,
                    phone: purchaseData.phone,
                    email: data.email,
                    address: "Dhaka",
                    type: "purchase",
                    callbackURL: `${
                        import.meta.env.VITE_FRONTEND_URL
                    }/paystation/purchase`, // Adjust based on backend callback handling
                };

                const payResult = await createPayment(paymentData);
                if (payResult?.error) {
                    toast.error((payResult?.error as TError)?.data?.message, {
                        id: toastId,
                    });
                }

                if (payResult?.data as TData<IPayStationInitiateResponse>) {
                    const paymentURL = payResult.data.data.payment_url;
                    toast.success("Redirecting to payment gateway...", {
                        id: toastId,
                    });
                    window.location.href = paymentURL;
                }
            } else {
                toast.success("Course purchase successfully", {
                    id: toastId,
                });
                navigate("/my-courses", { replace: true });
            }
        }
    };

    return (
        <div>
            <Form<TCreatePurchaseFromData>
                onSubmit={createPurchaseHandler}
                defaultValues={defaultValues}
            >
                <div className="grid gap-5">
                    <div>
                        <RadioField
                            name="method"
                            label="Payment Method"
                            options={[
                                defaultValues.method === "Free"
                                    ? { value: "Free", label: "Free" }
                                    : {
                                          value: "PayStation",
                                          label: "PayStation",
                                      },
                            ]}
                        />
                    </div>
                    {defaultValues.method !== "Free" && (
                        <div>
                            <InputField
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                            />
                        </div>
                    )}
                    <FormButton>
                        {defaultValues.method === "Free"
                            ? "Get Now"
                            : "Pay Now"}
                    </FormButton>
                </div>
            </Form>
        </div>
    );
};

export default PaymentForm;