import { Link, Navigate } from "react-router-dom";
import ContainerSM from "../../../components/common/Container/ContainerSM";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import {
    removeItem,
    updateItem,
    useCurrentCart,
    type TCartItem,
} from "../../../store/slices/cartSlice";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../../../store/slices/authSlice";
import type { TCreateOrder } from "../../../types";
import OrderUserInfoForm from "./components/OrderUserInfoForm/OrderUserInfoForm";
import OrderPaymentForm from "./components/OrderPaymentForm/OrderPaymentForm";
import { FaTrashCan } from "react-icons/fa6";

type TCartProductCardProps = {
    item: TCartItem;
    setOrderData: React.Dispatch<React.SetStateAction<TCreateOrder>>;
};

const CartProductCard = ({ item, setOrderData }: TCartProductCardProps) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(useCurrentCart);

    useEffect(() => {
        setOrderData((prev) => ({
            ...prev,
            products: cart.map((item) => ({
                product: item.product,
                price: item.price,
                quantity: item.quantity,
            })),
        }));
    }, [cart, setOrderData]);

    const handleIncreaseItem = () => {
        if (item.quantity < 3) {
            dispatch(
                updateItem({
                    product: item.product,
                    quantity: item.quantity + 1,
                })
            );
        }
    };

    const handleDecreaseItem = () => {
        if (item.quantity > 1) {
            dispatch(
                updateItem({
                    product: item.product,
                    quantity: item.quantity - 1,
                })
            );
        }
    };

    const handleRemoveItem = () => {
        dispatch(removeItem(item.product));
    };

    return (
        <div className="flex justify-start items-start gap-1.5 lg:gap-2.5">
            <img
                src={item.image}
                alt=""
                className="max-w-16 lg:max-w-20 w-full"
            />
            <div className="text-xs lg:text-sm mb-2">
                <p className="font-semibold mb-1.5">
                    {item.name} x{item.quantity}
                </p>
                <p className="mb-2">{item.price} BDT</p>

                <div className="flex justify-between text-sm">
                    <div className="flex gap-1.5">
                        <span
                            onClick={() => handleDecreaseItem()}
                            className="size-5 flex justify-center items-center bg-slate-200 text-base font-semibold rounded cursor-pointer"
                        >
                            -
                        </span>
                        <div>{item.quantity}</div>
                        <span
                            onClick={() => handleIncreaseItem()}
                            className="size-5 flex justify-center items-center bg-slate-200 text-base font-semibold rounded cursor-pointer"
                        >
                            +
                        </span>
                    </div>

                    <span
                        onClick={handleRemoveItem}
                        className="size-5 flex justify-center items-center text-slate-600 text-base cursor-pointer"
                    >
                        <FaTrashCan />
                    </span>
                </div>
            </div>
        </div>
    );
};

const Checkout = () => {
    const user = useAppSelector(useCurrentUser);
    const cart = useAppSelector(useCurrentCart);
    const [formStep, setFormStep] = useState<number>(1);
    const [orderData, setOrderData] = useState<TCreateOrder>({
        name: user?.name || "",
        phone: user?.phone || "",
        orderType: cart.length > 0 ? cart[0]?.type : "hardcopy",
        payMethod:
            cart.length > 0 && cart[0]?.type === "ebook"
                ? "Payment Gateway"
                : "Cash On Delivery",
        products: cart.map((item) => {
            return {
                product: item.product,
                price: item.price,
                quantity: item.quantity,
            };
        }),
    });
    if (cart.length === 0) {
        return <Navigate to={"/shop"} replace />;
    }

    return (
        <div className="py-10">
            <ContainerSM>
                <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 p-5 lg:p-8 shadow-[2px_2px_15px_2px_rgb(0,0,0,0.3)] rounded-xl">
                    <div className="h-max border border-primary rounded-xl p-3 lg:p-5">
                        {formStep === 1 ? (
                            !user && cart[0].type === "ebook" ? (
                                <div className="grid gap-3">
                                    <h4 className="text-xs lg:text-sm text-center pt-5">
                                        You don't have account?{" "}
                                        <Link
                                            to={"/auth/register"}
                                            state={{ to: "/checkout" }}
                                            className="font-semibold text-primary"
                                        >
                                            Signup
                                        </Link>
                                    </h4>
                                    <h4 className="text-xs lg:text-sm text-center pt-5">
                                        You have an account?{" "}
                                        <Link
                                            to={"/auth/login"}
                                            state={{ to: "/checkout" }}
                                            className="font-semibold text-primary"
                                        >
                                            Login
                                        </Link>
                                    </h4>
                                </div>
                            ) : (
                                <OrderUserInfoForm
                                    orderData={orderData}
                                    setOrderData={setOrderData}
                                    setFormStep={setFormStep}
                                />
                            )
                        ) : formStep === 2 ? (
                            <OrderPaymentForm
                                orderData={orderData}
                                setOrderData={setOrderData}
                            />
                        ) : (
                            <h4 className="text-center font-semibold">
                                Something went wrong
                            </h4>
                        )}
                    </div>

                    <div className="h-max border border-primary rounded-xl p-3 lg:p-5">
                        <h4 className="text-lg lg:text-xl mb-3">
                            Order Summary
                        </h4>

                        <div className="grid gap-2 pb-6 border-b">
                            {cart.map((item) => (
                                <CartProductCard
                                    key={item.product}
                                    setOrderData={setOrderData}
                                    item={item}
                                />
                            ))}
                        </div>

                        <div className="grid gap-2 pb-3 border-b">
                            <div className="flex justify-between items-center gap-2">
                                <p className="text-sm">Subtotal</p>
                                <p className="text-sm text-right">
                                    {cart.reduce(
                                        (acc, item) =>
                                            acc + item.price * item.quantity,
                                        0
                                    )}{" "}
                                    BDT
                                </p>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <p className="text-sm">Discount</p>
                                <p className="text-sm text-right">
                                    {orderData?.discount || 0} BDT
                                </p>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <p className="text-sm">Delivey Charge</p>
                                <p className="text-sm text-right">
                                    {orderData?.area === "Dhaka"
                                        ? 70
                                        : orderData?.area === "Dhaka Out"
                                        ? 0
                                        : 0}{" "}
                                    BDT
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2 py-3">
                            <p className="text-sm">Total</p>
                            <p className="text-sm text-right">
                                {cart.reduce(
                                    (acc, item) =>
                                        acc + item.price * item.quantity,
                                    0
                                ) +
                                    (orderData?.discount || 0) +
                                    (orderData?.area === "Dhaka"
                                        ? 70
                                        : orderData?.area === "Dhaka Out"
                                        ? 0
                                        : 0)}{" "}
                                BDT
                            </p>
                        </div>
                    </div>
                </div>
            </ContainerSM>
        </div>
    );
};

export default Checkout;
