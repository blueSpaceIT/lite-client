import type z from "zod";
import { AuthResolvers } from "../../../resolvers/auth.resolvers";
import { authService } from "../../../store/services/authService";
import toast from "react-hot-toast";
import { useState } from "react";
import type { TError } from "../../../types";
import Form from "../../../components/common/Form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../components/common/Form/InputField";
import FormButton from "../../../components/common/Form/FormButton";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const defaultValues = {
        phone: "",
    };

    type TForgotPasswordFromData = z.infer<
        typeof AuthResolvers.forgetPasswordValidationSchema
    >;

    const [forgetPassword] = authService.useForgetPasswordMutation();

    const forgetPasswordHandler = async (data: TForgotPasswordFromData) => {
        const toastId = toast.loading("Wait a while");

        const result = await forgetPassword(data);
        if (result?.error) {
            toast.error((result?.error as TError)?.data?.message, {
                id: toastId,
            });
        }

        if (result?.data) {
            toast.success("Reset link sent successfully", {
                id: toastId,
            });
            setIsSuccess(true);
        }
    };

    return (
        <div className="py-14">
            <div className="max-w-[480px] md:w-full mx-5 md:mx-auto">
                <div>
                    <div className="text-center mb-8">
                        <div className="size-20 rounded-full mx-auto mb-4">
                            <img src={"/Logo.png"} alt="" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Lite Edu Career
                        </h1>
                    </div>

                    {/* Forgot Password Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        {/* Card Header */}
                        <div className="bg-primary p-6">
                            <h2 className="text-xl font-bold text-white text-center">
                                Forgot Password
                            </h2>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 md:p-8">
                            {isSuccess ? (
                                <div className="text-center space-y-5">
                                    {/* Success Icon with Animation */}
                                    <div className="relative inline-block">
                                        <svg
                                            className="w-16 h-16 text-green-500 animate-scaleIn"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                            SMS Successfull
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Successfully reset link has been
                                            sent
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <Form
                                    onSubmit={forgetPasswordHandler}
                                    defaultValues={defaultValues}
                                    resolver={zodResolver(
                                        AuthResolvers.forgetPasswordValidationSchema
                                    )}
                                >
                                    <div className="space-y-5">
                                        {/* Phone Input */}
                                        <div className="space-y-2">
                                            <InputField
                                                name="phone"
                                                placeholder="Phone"
                                                label="Phone"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <FormButton>Send SMS</FormButton>
                                    </div>
                                </Form>
                            )}

                            {/* Registration Link */}
                            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                                <p className="text-gray-600">
                                    You have a account?{" "}
                                    <Link
                                        to="/auth/login"
                                        className="font-semibold text-primary hover:text-primary-dark transition-colors"
                                    >
                                        Login now
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
