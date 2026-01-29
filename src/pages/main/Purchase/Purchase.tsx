import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { Navigate, useParams } from "react-router-dom";
import Container from "../../../components/common/Container/Container";
import Loader from "../../../components/common/Loader/Loader";
import { useAppSelector } from "../../../store/hook";
import { courseService } from "../../../store/services/courseService";
import { useCurrentUser } from "../../../store/slices/authSlice";
import type { TCourse, TPurchaseData } from "../../../types";
import CouponForm from "./components/CouponForm/CouponForm";
import LoginPassword from "./components/LoginPassword/LoginPassword";
import PaymentForm from "./components/PaymentForm/PaymentForm";
import RegisterPassword from "./components/RegisterPassword/RegisterPassword";
import UserInfoForm from "./components/UserInfoForm/UserInfoForm";

type TCouponResponse = {
    loading: boolean;
    isDiscount: boolean;
    message: string;
};

const Purchase = () => {
    const user = useAppSelector(useCurrentUser);
    const { courseID } = useParams();
    const [course, setCourse] = useState<TCourse | null>(null);
    const [formStep, setFormStep] = useState<number>(1);
    const [couponResponse, setCouponResponse] = useState<TCouponResponse>({
        loading: false,
        isDiscount: false,
        message: "",
    });
    const [purchaseData, setPurchaseData] = useState<TPurchaseData>({
        name: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
        course: "",
        price: 0,
    });
    const { data, isSuccess } = courseService.useGetCourseQuery(courseID);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setCourse(data.data);
            setPurchaseData((prev) => ({
                ...prev,
                course: data.data.id,
                price: data.data.offerPrice
                    ? data.data.offerPrice
                    : data.data.price,
            }));
        }
    }, [data, isSuccess]);

    if (course?.type === "Offline") {
        return <Navigate to={"/courses"} replace />;
    }

    return (
        <div className="py-14">
            <Container>
                {course ? (
                    <div>
                        <div className="flex justify-between items-center gap-2 mb-8 lg:mb-14 text-xs lg:text-lg">
                            <div className="flex flex-col justify-center items-center gap-2">
                                <div className="size-5 lg:size-10 rounded-full bg-[#13A052] text-white flex justify-center items-center">
                                    1
                                </div>
                                <p className="text-center">Cart</p>
                            </div>

                            <div className="w-[60px] md:w-[160px] lg:w-[360px] h-[1px] bg-black mb-6"></div>

                            <div className="flex flex-col justify-center items-center gap-2">
                                <div
                                    className={`size-5 lg:size-10 rounded-full flex justify-center items-center ${
                                        formStep === 2 || formStep === 3
                                            ? "bg-[#13A052] text-white"
                                            : "bg-[#DDDADA]"
                                    }`}
                                >
                                    <FaRegUser />
                                </div>
                                <p className="text-center">Login</p>
                            </div>

                            <div className="w-[60px] md:w-[160px] lg:w-[360px] h-[1px] bg-black mb-6"></div>

                            <div className="flex flex-col justify-center items-center gap-2">
                                <div className="size-5 lg:size-10 rounded-full bg-[#DDDADA] flex justify-center items-center">
                                    2
                                </div>
                                <p className="text-center">Payment</p>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 p-5 lg:p-8 shadow-[2px_2px_15px_2px_rgb(0,0,0,0.3)] rounded-xl">
                            <div className="border border-primary rounded-xl p-3 lg:p-5">
                                <img
                                    src={course.image}
                                    alt=""
                                    className="max-w-[200px] w-full mb-3"
                                />

                                <h5 className="lg:text-xl font-bold pb-3 border-b border-[#6B706C]">
                                    {course.name}
                                </h5>

                                <div className="flex justify-between items-center gap-2 text-sm lg:text-lg py-3">
                                    {/* <p>কোর্সের মূল্য</p> */}
                                    <p>Course Price</p>
                                    <p className="text-right">
                                        ৳{" "}
                                        {course.offerPrice
                                            ? course.offerPrice
                                            : course.price}{" "}
                                        BDT
                                    </p>
                                </div>
                            </div>

                            {formStep === 1 ? (
                                <CouponForm
                                    course={course}
                                    purchaseData={purchaseData}
                                    setPurchaseData={setPurchaseData}
                                    couponResponse={couponResponse}
                                    setCouponResponse={setCouponResponse}
                                    setFormStep={setFormStep}
                                />
                            ) : formStep === 2 ? (
                                <UserInfoForm
                                    setPurchaseData={setPurchaseData}
                                    setFormStep={setFormStep}
                                />
                            ) : formStep === 3 ? (
                                <LoginPassword
                                    purchaseData={purchaseData}
                                    setFormStep={setFormStep}
                                />
                            ) : formStep === 4 ? (
                                <RegisterPassword
                                    purchaseData={purchaseData}
                                    setFormStep={setFormStep}
                                />
                            ) : formStep === 5 ? (
                                <PaymentForm purchaseData={purchaseData} />
                            ) : (
                                <h4 className="text-center font-semibold">
                                    Something went wrong
                                </h4>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Purchase;
