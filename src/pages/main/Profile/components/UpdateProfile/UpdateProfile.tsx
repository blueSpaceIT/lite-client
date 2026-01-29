import type z from "zod";
import { useAppDispatch, useAppSelector } from "../../../../../store/hook";
import {
    setUser,
    useCurrentToken,
    useCurrentUser,
} from "../../../../../store/slices/authSlice";
import { StudentResolvers } from "../../../../../resolvers/student.resolvers";
import { studentService } from "../../../../../store/services/studentService";
import toast from "react-hot-toast";
import type { TData, TError, TUser } from "../../../../../types";
import Form from "../../../../../components/common/Form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../../../components/common/Form/InputField";
import FormButton from "../../../../../components/common/Form/FormButton";

const UpdateProfile = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(useCurrentUser);
    const token = useAppSelector(useCurrentToken);
    const defaultValues = {
        name: user?.name,
        university: user?.university,
        department: user?.department,
        district: user?.district,
    };

    type TUpdateProfileData = z.infer<
        typeof StudentResolvers.updateStudentValidationSchema
    >;

    const [updateProfile] = studentService.useUpdateStudentMutation();

    const updateProfileHandler = async (data: TUpdateProfileData) => {
        const toastID = toast.loading("Wait a while");
        const result = await updateProfile({ id: user?.id, ...data });
        if (result?.error) {
            toast.error((result?.error as TError)?.data?.message, {
                id: toastID,
            });
        }

        if (result?.data as TData<TUser>) {
            toast.success("Update successful", { id: toastID });
            dispatch(
                setUser({
                    user: result?.data.data,
                    token,
                })
            );
            window.location.reload();
        }
    };

    return (
        <div>
            <h4 className="text-lg font-semibold mb-6">Update Profile Info</h4>

            <Form
                onSubmit={updateProfileHandler}
                defaultValues={defaultValues}
                resolver={zodResolver(
                    StudentResolvers.updateStudentValidationSchema
                )}
            >
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <InputField name="name" placeholder="Name" label="Name" />
                    <InputField
                        name="university"
                        placeholder="University"
                        label="University"
                    />
                    <InputField
                        name="department"
                        placeholder="Department"
                        label="Department"
                    />
                    <InputField
                        name="district"
                        placeholder="District"
                        label="District"
                    />
                </div>
                <div className="flex justify-center">
                    <FormButton>Update</FormButton>
                </div>
            </Form>
        </div>
    );
};

export default UpdateProfile;
