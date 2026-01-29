import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/hook";
import { clearCart } from "../../../store/slices/cartSlice";
import { orderService } from "../../../store/services/orderService";
import { purchaseService } from "../../../store/services/purchaseService";
import { useEffect } from "react";

const SSLCommerz = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    if (type === "order") {
        setTimeout(() => {
            dispatch(clearCart());
        }, 300);
    }

    const getData = (type: string, id: string) => {
        return type === "order"
            ? orderService.useGetOrderQuery(id)
            : purchaseService.useGetPurchaseQuery(id);
    };

    const [searchParams] = useSearchParams();
    const status = searchParams.get("status") || "";
    const tran_id = searchParams.get("tran_id") || "";

    const { data, isFetching, isLoading, isSuccess } = getData(
        type as string,
        tran_id
    );

    useEffect(() => {
        if (isSuccess && data?.data) {
            if (type === "order") {
                navigate("/order/success", {
                    replace: true,
                    state: { order: data.data },
                });
            }

            if (type === "purchase") {
                navigate("/my-courses", {
                    replace: true,
                });
            }
        }
    }, [isSuccess, data, type, navigate]);

    return (
        <div>
            {!status || status === "FAILED" ? (
                <p className="text-center text-primary text-2xl lg:text-3xl px-2 py-10 mx-5">
                    Payment Successfull. But something wrong occured. Please
                    contact with support. Your {type} ID is {tran_id}
                </p>
            ) : status === "INVALID_TRANSACTION" ? (
                <p className="text-center text-primary text-2xl lg:text-3xl px-2 py-10 mx-5">
                    Payment Failed. Your {type} ID was {tran_id}
                </p>
            ) : (status === "VALID" || status === "VALIDATED") &&
              (isFetching || isLoading) ? (
                <p className="text-center text-xl lg:text-2xl px-2 py-10 mx-5">
                    Waiting for Payment Gateway Response...
                </p>
            ) : (status === "VALID" || status === "VALIDATED") &&
              isSuccess &&
              data?.data ? (
                <p className="text-center text-xl lg:text-2xl px-2 py-10 mx-5">
                    Redirecting...
                </p>
            ) : (
                <p className="text-center text-xl lg:text-2xl px-2 py-10 mx-5">
                    Something went wrong
                </p>
            )}
        </div>
    );
};

export default SSLCommerz;
