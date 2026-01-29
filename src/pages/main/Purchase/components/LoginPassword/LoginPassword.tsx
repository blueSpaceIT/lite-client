import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordField from "../../../../../components/common/Form/PasswordField";
import FormButton from "../../../../../components/common/Form/FormButton";
import type { TPurchaseData, TSigninResponse } from "../../../../../types";
import Form from "../../../../../components/common/Form/Form";
import { AuthResolvers } from "../../../../../resolvers/auth.resolvers";
import loginAction from "../../../../../utils/loginAction";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../../../../store/hook";
import { setUser } from "../../../../../store/slices/authSlice";

type Props = {
    purchaseData: TPurchaseData;
    setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

const LoginPassword = ({ purchaseData, setFormStep }: Props) => {
    const dispatch = useAppDispatch();
    const authDefaultValues = {
        phone: purchaseData?.phone || "",
        password: "",
    };

    type TAuthFromData = z.infer<typeof AuthResolvers.signinValidationSchema>;

    const loginStudentHandler = async (data: TAuthFromData) => {
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

            setFormStep(5);
        }
    };

    return (
        <div className="border border-primary rounded-xl p-3 lg:p-5">
            <h5 className="lg:text-xl font-bold pb-3 border-b border-[#6B706C]">
                Enter your password
            </h5>

            <div className={"grid pt-4"}>
                <Form<TAuthFromData>
                    onSubmit={loginStudentHandler}
                    defaultValues={authDefaultValues}
                    resolver={zodResolver(AuthResolvers.signinValidationSchema)}
                >
                    <div className="grid gap-2">
                        <PasswordField
                            name="password"
                            placeholder="********"
                            label="Password (For Login)"
                        />
                        <FormButton>Next</FormButton>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginPassword;
