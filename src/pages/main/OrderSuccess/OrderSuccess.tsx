import { Link, Navigate, useLocation } from "react-router-dom";
import ContainerSM from "../../../components/common/Container/ContainerSM";
import TitleCardTwo from "../../../components/common/TitleCardTwo/TitleCardTwo";
import { Button } from "@headlessui/react";
import { useAppDispatch } from "../../../store/hook";
import { clearCart } from "../../../store/slices/cartSlice";

const OrderSuccess = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const order = location.state?.order;
    if (!order) {
        return <Navigate to="/" replace />;
    } else {
        setTimeout(() => {
            dispatch(clearCart());
        }, 300);
    }

    return (
        <div className="py-10">
            <ContainerSM>
                <div className="py-6">
                    <TitleCardTwo text="অর্ডার সাবমিট" />

                    <div className="flex justify-center items-center">
                        <img
                            src="/check-mark.png"
                            alt=""
                            className="max-w-[80px] w-full mb-5"
                        />
                    </div>
                    <p className="text-center mb-1">
                        আপনার অর্ডারটি সাবমিট হয়েছে
                    </p>
                    <p className="text-center text-green-700 mb-6">
                        আপনার অর্ডার নম্বর: {order.id}
                    </p>

                    <div className="max-w-[200px] w-full mx-auto flex flex-col gap-2">
                        <Link to={"/shop"}>
                            <Button className="w-full text-primary bg-white border border-primary rounded-lg px-3 py-1.5 cursor-pointer">
                                আরো কিনুন
                            </Button>
                        </Link>
                        <Link to={"/"}>
                            <Button className="w-full text-white bg-primary border border-primary rounded-lg px-3 py-1.5 cursor-pointer">
                                হোমে ফিরুন
                            </Button>
                        </Link>
                    </div>
                </div>
            </ContainerSM>
        </div>
    );
};

export default OrderSuccess;
