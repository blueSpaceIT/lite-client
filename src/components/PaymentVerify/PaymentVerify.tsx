/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { paystationServics } from "../../store/services/paystationService";

type Status = "loading" | "success" | "error";

export default function PaymentVerify() {
  const { type } = useParams<{ type: "order" | "purchase" }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const invoice = searchParams.get("invoice_number"); // FIX
  const trxId = searchParams.get("trx_id");
  const redirectStatus = searchParams.get("status");
  console.log(trxId);

  const [verifyPayment] = paystationServics.useVerifyPaymentMutation();

  const [status, setStatus] = useState<Status>("loading");
  const [, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    if (!invoice || !type) {
      setStatus("error");
      setMessage("Invalid payment data");
      return;
    }

    if (redirectStatus === "FAILED") {
      setStatus("error");
      setMessage("Payment failed");
      return;
    }

    verify();
  }, [invoice, type]);

  const verify = async () => {
    try {
      const res = await verifyPayment({
        invoice_number: invoice,
        trx_id: trxId || undefined,
      }).unwrap();
      console.log(res);

      setStatus("success");
      setMessage("Payment verified successfully");

      // setTimeout(() => {
      navigate(type === "order" ? "/orders" : "/my-courses");
      // }, 3000);
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "loading" && <h2>Verifying...</h2>}
      {status === "success" && <h2>Payment Successful</h2>}
      {status === "error" && <h2>Payment Failed</h2>}
    </div>
  );
}
