import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hook";
import { useCurrentToken } from "../../../store/slices/authSlice";
import { StudentResolvers } from "../../../resolvers/student.resolvers";
import type z from "zod";
import toast from "react-hot-toast";
import { studentService } from "../../../store/services/studentService";
import type { TData, TError, TUser } from "../../../types";
import Form from "../../../components/common/Form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../components/common/Form/InputField";
import PasswordField from "../../../components/common/Form/PasswordField";
import FormButton from "../../../components/common/Form/FormButton";

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const destination = location.state?.to || "/dashboard";
    const token = useAppSelector(useCurrentToken);

    if (token) {
        return <Navigate to={destination} replace />;
    }

    const defaultValues = {
        name: "",
        phone: "",
        password: "",
    };

    const [createStudent] = studentService.useCreateStudentMutation();

    type TRegisterFromData = z.infer<
        typeof StudentResolvers.createStudentValidationSchema
    >;

    const registerHandler = async (data: TRegisterFromData) => {
        const toastId = toast.loading("Wait a while");

        const result = await createStudent(data);
        console.log(result);
        if (result?.error) {
            toast.error((result?.error as TError)?.data?.message, {
                id: toastId,
            });
        }

        if (result?.data as TData<TUser>) {
            toast.success("Register successfull", {
                id: toastId,
            });

            navigate("/auth/login", { replace: true });
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
                        <p className="text-gray-600 mt-2">
                            Register new account
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        {/* Card Header */}
                        <div className="bg-primary p-6">
                            <h2 className="text-xl font-bold text-white text-center">
                                Signup
                            </h2>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 md:p-8">
                            <Form<TRegisterFromData>
                                onSubmit={registerHandler}
                                defaultValues={defaultValues}
                                resolver={zodResolver(
                                    StudentResolvers.createStudentValidationSchema
                                )}
                            >
                                <div className="space-y-5">
                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <InputField
                                            name="name"
                                            placeholder="Name"
                                            label="Name"
                                        />
                                    </div>

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
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <FormButton>Submit</FormButton>
                                </div>
                            </Form>

                            {/* Login Link */}
                            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                                <p className="text-gray-600">
                                    You have a account?{" "}
                                    <Link
                                        to="/auth/login"
                                        state={{ to: destination }}
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

export default Register;

{
    /* <div className="py-14">
    <div className="max-w-[480px] md:w-full mx-5 md:mx-auto">
        <div className="grid p-5 lg:p-8 shadow-[2px_2px_15px_2px_rgb(0,0,0,0.3)] rounded-xl">
            <div className="border border-primary rounded-xl p-3 lg:p-5">
                <h5 className="lg:text-xl font-bold pb-3 border-b border-[#6B706C]">
                    রেজিস্টার
                </h5>

                <div className={"grid pt-4"}>
                    <Form<TRegisterFromData>
                        onSubmit={registerHandler}
                        defaultValues={defaultValues}
                        resolver={zodResolver(
                            StudentResolvers.createStudentValidationSchema
                        )}
                    >
                        <div className="grid gap-2">
                            <InputField
                                name="name"
                                placeholder="নাম"
                                label="নাম"
                            />
                            <InputField
                                name="phone"
                                placeholder="মোবাইল নাম্বার"
                                label="মোবাইল নাম্বার"
                            />
                            <PasswordField
                                name="password"
                                placeholder="********"
                                label="পাসওয়ার্ড"
                            />
                            <FormButton>রেজিস্টার</FormButton>
                        </div>
                    </Form>
                    <h4 className="text-xs lg:text-sm text-center pt-5">
                        আপনার একাউন্ট আছে?{" "}
                        <Link
                            to={"/auth/login"}
                            state={{ to: destination }}
                            className="font-semibold text-primary"
                        >
                            লগইন করুন
                        </Link>
                    </h4>
                </div>
            </div>
        </div>
    </div>
</div> */
}
