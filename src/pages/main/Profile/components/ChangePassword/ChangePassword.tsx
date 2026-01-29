import type z from "zod";
import { StudentResolvers } from "../../../../../resolvers/student.resolvers";
import { studentService } from "../../../../../store/services/studentService";
import toast from "react-hot-toast";
import { useAppSelector } from "../../../../../store/hook";
import { useCurrentUser } from "../../../../../store/slices/authSlice";
import type { TData, TError, TUser } from "../../../../../types";
import Form from "../../../../../components/common/Form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordField from "../../../../../components/common/Form/PasswordField";
import FormButton from "../../../../../components/common/Form/FormButton";

const ChangePassword = () => {
    const user = useAppSelector(useCurrentUser);
    const defaultValues = {
        oldPassword: "",
        newPassword: "",
    };

    type TUpdatePasswordData = z.infer<
        typeof StudentResolvers.updateStudentPasswordValidationSchema
    >;

    const [updatePassword] = studentService.useUpdatePasswordMutation();

    const updatePasswordHandler = async (data: TUpdatePasswordData) => {
        const toastID = toast.loading("Wait a while");
        const result = await updatePassword({ id: user?.id, ...data });
        if (result?.error) {
            toast.error((result?.error as TError)?.data?.message, {
                id: toastID,
            });
        }

        if (result?.data as TData<TUser>) {
            toast.success("Update successful", { id: toastID });
        }
    };

    return (
        <div>
            <h4 className="text-lg font-semibold mb-6">Change Password</h4>

            <Form
                onSubmit={updatePasswordHandler}
                defaultValues={defaultValues}
                resolver={zodResolver(
                    StudentResolvers.updateStudentPasswordValidationSchema
                )}
            >
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <PasswordField
                        name="oldPassword"
                        placeholder="********"
                        label="Old Password"
                    />
                    <PasswordField
                        name="newPassword"
                        placeholder="********"
                        label="New Password"
                    />
                </div>
                <div className="flex justify-center">
                    <FormButton>Update Password</FormButton>
                </div>
            </Form>
        </div>
    );
};

export default ChangePassword;
