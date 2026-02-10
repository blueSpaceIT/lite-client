/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type z from "zod";

import Form from "../../../../../components/common/Form/Form";
import FormButton from "../../../../../components/common/Form/FormButton";
import InputField from "../../../../../components/common/Form/InputField";
import RadioField from "../../../../../components/common/Form/RadioField";

import type { PayStationResolvers } from "../../../../../resolvers/PayStationResolvers";

import { paystationServics } from "../../../../../store/services/paystationService";
import { purchaseService } from "../../../../../store/services/purchaseService";

import type { TPurchase, TPurchaseData } from "../../../../../types";

type Props = {
  purchaseData: TPurchaseData;
};

type TCreatePurchaseFromData = {
  method: "Free" | "PayStation";
  email: string;
};

type TCreatePaymentData = z.infer<
  typeof PayStationResolvers.PayStationValidationSchema
>;

const PaymentForm = ({ purchaseData }: Props) => {
  const navigate = useNavigate();

  const defaultValues: TCreatePurchaseFromData = {
    method: purchaseData.price === 0 ? "Free" : "PayStation",
    email: purchaseData.email || "",
  };

  const [createPurchase] = purchaseService.useCreatePurchaseMutation();
  const [createPayment] = paystationServics.useCreatePaymentMutation();

  const createPurchaseHandler = async (formData: TCreatePurchaseFromData) => {
    const toastId = toast.loading("Processing...");

    try {
      // VALIDATION
      if (formData.method === "PayStation" && !formData.email) {
        toast.error("Email is required for PayStation", { id: toastId });
        return;
      }

      // STEP 1 — CREATE PURCHASE
      const purchaseRes = await createPurchase({
        ...purchaseData,
        branch: "online",
      }).unwrap();

      const purchase: TPurchase = purchaseRes.data;
      console.log(purchase._id)

      // FREE PURCHASE
      if (formData.method === "Free") {
        toast.success("Course activated successfully", { id: toastId });
        navigate("/my-courses", { replace: true });
        return;
      }

      // STEP 2 — CREATE PAYMENT REQUEST
      const paymentPayload: TCreatePaymentData = {
        totalAmount: purchase.totalAmount,
        invoiceID: purchase._id, // IMPORTANT FIX
        name: purchaseData.name,
        phone: purchaseData.phone,
        email: formData.email,
        address: "Dhaka",
        type: "purchase",
        callbackURL: `${import.meta.env.VITE_FRONTEND_URL}/payment/callback`,
      };

      const paymentRes = await createPayment(paymentPayload).unwrap();

      const paymentURL = paymentRes.data?.payment_url;

      if (!paymentURL) {
        throw new Error("Payment URL not received");
      }

      toast.success("Redirecting to payment gateway...", { id: toastId });

      // REDIRECT
      window.location.href = paymentURL;
    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong",
        { id: toastId },
      );
    }
  };

  return (
    <div>
      <Form<TCreatePurchaseFromData>
        onSubmit={createPurchaseHandler}
        defaultValues={defaultValues}
      >
        <div className="grid gap-5">
          {/* PAYMENT METHOD */}
          <RadioField
            name="method"
            label="Payment Method"
            options={[
              purchaseData.price === 0
                ? { value: "Free", label: "Free" }
                : { value: "PayStation", label: "PayStation" },
            ]}
          />

          {/* EMAIL FIELD */}
          {purchaseData.price !== 0 && (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
          )}

          {/* SUBMIT BUTTON */}
          <FormButton>
            {purchaseData.price === 0 ? "Get Now" : "Pay Now"}
          </FormButton>
        </div>
      </Form>
    </div>
  );
};

export default PaymentForm;
