import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../../components/common/Form/Form";
import type z from "zod";
import { AuthResolvers } from "../../../resolvers/auth.resolvers";
import InputField from "../../../components/common/Form/InputField";
import FormButton from "../../../components/common/Form/FormButton";
import PasswordField from "../../../components/common/Form/PasswordField";
import toast from "react-hot-toast";
import loginAction from "../../../utils/loginAction";
import type { TSigninResponse } from "../../../types";
import { setUser, useCurrentToken } from "../../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { Link, Navigate, useLocation } from "react-router-dom";

const Login = () => {
    const location = useLocation();
    const destination = location.state?.to || "/dashboard";
    const token = useAppSelector(useCurrentToken);
    const dispatch = useAppDispatch();

    if (token) {
        return <Navigate to={destination} replace />;
    }

    const defaultValues = {
        phone: "",
        password: "",
    };

    type TLoginFromData = z.infer<typeof AuthResolvers.signinValidationSchema>;

    const loginHandler = async (data: TLoginFromData) => {
        const toastId = toast.loading("Wait a while");

        const result = await loginAction(data);
        if (!result?.success) {
            toast.error(result?.message, {
                id: toastId,
            });
        }

        if (result?.data as TSigninResponse) {
            dispatch(
                setUser({
                    user: result?.data?.user,
                    token: result?.data?.token,
                })
            );

            toast.success("Signin successfull", {
                id: toastId,
            });
        }
    };

    return (
        <div className="py-14 bg-gradient-to-r from-[#090913] to-[#0d0d15] text-white">
            <div className="max-w-[480px] md:w-full mx-5 md:mx-auto">
                <div>
                    <div className="text-center mb-8">
                        <div className="size-20 rounded-full mx-auto mb-4">
                            <img src={"/favicon.png"} alt="" />
                        </div>
                        <h1 className="text-2xl font-bold ">
                            Oditi Career
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Login into your account
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        {/* Card Header */}
                        <div className="bg-primary p-6">
                            <h2 className="text-xl font-bold text-white text-center">
                                Login
                            </h2>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 md:p-8">
                            <Form
                                onSubmit={loginHandler}
                                defaultValues={defaultValues}
                                resolver={zodResolver(
                                    AuthResolvers.signinValidationSchema
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

                                    {/* Password Input */}
                                    <div className="space-y-2">
                                        <PasswordField
                                            name="password"
                                            placeholder="********"
                                            label="Password"
                                            extra={
                                                <Link
                                                    to="/auth/forgot-password"
                                                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                                                >
                                                    Forget Password?
                                                </Link>
                                            }
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <FormButton>Login</FormButton>
                                </div>
                            </Form>

                            {/* Registration Link */}
                            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                                <p className="text-gray-600">
                                    You don't have account?{" "}
                                    <Link
                                        to="/auth/register"
                                        state={{ to: destination }}
                                        className="font-semibold text-primary hover:text-primary-dark transition-colors"
                                    >
                                        Register now
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

export default Login;
