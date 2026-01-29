import type z from "zod";
import { StudentResolvers } from "../../../../../resolvers/student.resolvers";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordField from "../../../../../components/common/Form/PasswordField";
import FormButton from "../../../../../components/common/Form/FormButton";
import type {
    TData,
    TError,
    TPurchaseData,
    TSigninResponse,
    TUser,
} from "../../../../../types";
import Form from "../../../../../components/common/Form/Form";
import { useAppDispatch } from "../../../../../store/hook";
import { studentService } from "../../../../../store/services/studentService";
import toast from "react-hot-toast";
import loginAction from "../../../../../utils/loginAction";
import { setUser } from "../../../../../store/slices/authSlice";

type Props = {
    purchaseData: TPurchaseData;
    setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

const RegisterPassword = ({ purchaseData, setFormStep }: Props) => {
    const dispatch = useAppDispatch();
    const studentDefaultValues = {
        name: purchaseData?.name || "",
        phone: purchaseData?.phone || "",
        password: "",
    };

    const [createStudent] = studentService.useCreateStudentMutation();

    type TStudentFromData = z.infer<
        typeof StudentResolvers.createStudentValidationSchema
    >;

    const createStudentHandler = async (data: TStudentFromData) => {
        const toastId = toast.loading("Wait a while");
        const result = await createStudent(data);
        if (result?.error) {
            toast.error((result?.error as TError)?.data?.message, {
                id: toastId,
            });
        }

        if (result?.data as TData<TUser>) {
            const loginResult = await loginAction({
                phone: data.phone,
                password: data.password,
            });
            if (!loginResult?.success) {
                toast.error(loginResult?.message, {
                    id: toastId,
                });
            }

            if (loginResult?.data as TSigninResponse) {
                dispatch(
                    setUser({
                        user: loginResult?.data?.user,
                        token: loginResult?.data?.token,
                    })
                );

                toast.success("Signin successfull", {
                    id: toastId,
                });

                setFormStep(5);
            }
        }
    };

    return (
        <div className="border border-primary rounded-xl p-3 lg:p-5">
            <h5 className="lg:text-xl font-bold pb-3 border-b border-[#6B706C]">
                Enter your password
            </h5>

            <div className={"grid pt-4"}>
                <Form<TStudentFromData>
                    onSubmit={createStudentHandler}
                    defaultValues={studentDefaultValues}
                    resolver={zodResolver(
                        StudentResolvers.createStudentValidationSchema
                    )}
                >
                    <div className="grid gap-2">
                        <PasswordField
                            name="password"
                            placeholder="********"
                            label="New Password (For Register)"
                        />
                        <FormButton>Next</FormButton>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default RegisterPassword;
