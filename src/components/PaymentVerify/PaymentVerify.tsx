/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { paystationServics } from "../../store/services/paystationService";

type Status = "loading" | "success" | "error";

export default function PaymentVerify() {
  const { type } = useParams<{ type: "order" | "purchase" }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const invoice = searchParams.get("invoice");

  const [verifyPayment] = paystationServics.useVerifyPaymentMutation();

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState<string>("Verifying payment...");

  useEffect(() => {
    if (!invoice || !type) {
      setStatus("error");
      setMessage("Missing payment information");
      return;
    }

    handleVerify();
  }, [invoice, type]);

  const handleVerify = async () => {
    try {
      const res = await verifyPayment({
        invoice,
        type,
      }).unwrap();

      if (res.success) {
        setStatus("success");
        setMessage("Payment verified successfully");

        setTimeout(() => {
          navigate(type === "order" ? "/orders" : "/dashboard");
        }, 4000);
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err?.data?.message || err?.message || "Payment verification failed",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {status === "loading" && (
          <>
            <h2 className="text-xl font-semibold mb-4">🔄 Verifying Payment</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 style={{ color: "#16a34a" }}>✅ Payment Successful</h2>
            <p>{message}</p>
            <p>You will be redirected shortly...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 style={{ color: "#dc2626" }}>❌ Verification Failed</h2>
            <p>{message}</p>
            <button onClick={() => navigate("/")}>Go Home</button>
          </>
        )}
      </div>
    </div>
  );
}
