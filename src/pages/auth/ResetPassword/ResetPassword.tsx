import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Form from "../../../components/common/Form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthResolvers } from "../../../resolvers/auth.resolvers";
import PasswordField from "../../../components/common/Form/PasswordField";
import FormButton from "../../../components/common/Form/FormButton";
import toast from "react-hot-toast";
import type { TError } from "../../../types";
import { authService } from "../../../store/services/authService";
import type z from "zod";

const ResetPassword = () => {
    const navigate = useNavigate();
    const defaultValues = {
        password: "",
    };

    const [searchParams] = useSearchParams();

    type TForgotPasswordFromData = z.infer<
        typeof AuthResolvers.resetPasswordValidationSchema
    >;

    const [resetPassword] = authService.useResetPasswordMutation();

    const resetPasswordHandler = async (data: TForgotPasswordFromData) => {
        const toastId = toast.loading("Wait a while");

        const result = await resetPassword({
            token: `Bearer ${searchParams.get("token")}`,
            ...data,
        });
        if (result?.error) {
            toast.error((result?.error as TError)?.data?.message, {
                id: toastId,
            });
        }

        if (result?.data) {
            toast.success("Password reset successful", {
                id: toastId,
            });

            navigate("/dashboard", { replace: true });
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
                            Lite Edu 
                        </h1>
                    </div>

                    {/* Forgot Password Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        {/* Card Header */}
                        <div className="bg-primary p-6">
                            <h2 className="text-xl font-bold text-white text-center">
                                Reset Password
                            </h2>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 md:p-8">
                            <Form
                                onSubmit={resetPasswordHandler}
                                defaultValues={defaultValues}
                                resolver={zodResolver(
                                    AuthResolvers.resetPasswordValidationSchema
                                )}
                            >
                                <div className="space-y-5">
                                    {/* Phone Input */}
                                    <div className="space-y-2">
                                        <PasswordField
                                            name="password"
                                            placeholder="********"
                                            label="Password"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <FormButton>Reset Password</FormButton>
                                </div>
                            </Form>

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

export default ResetPassword;
