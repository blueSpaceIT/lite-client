import type z from "zod";
import Form from "../../../../../components/common/Form/Form";
import { StudentResolvers } from "../../../../../resolvers/student.resolvers";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../../../components/common/Form/InputField";
import FormButton from "../../../../../components/common/Form/FormButton";
import type { TPurchaseData } from "../../../../../types";
import getData from "../../../../../utils/getData";

type Props = {
    setPurchaseData: React.Dispatch<React.SetStateAction<TPurchaseData>>;
    setFormStep: React.Dispatch<React.SetStateAction<number>>;
};

const UserInfoForm = ({ setPurchaseData, setFormStep }: Props) => {
    const studentDefaultValues = {
        name: "",
        phone: "",
        password: "12345678",
    };

    type TStudentFromData = z.infer<
        typeof StudentResolvers.createStudentValidationSchema
    >;

    const findStudentHandler = async (data: TStudentFromData) => {
        setPurchaseData((prev) => ({
            ...prev,
            name: data.name,
            phone: data.phone,
        }));

        const student = await getData(
            `${import.meta.env.VITE_BACKEND_URL}/students/${data.phone}/phone`
        );
        if (student?.success) {
            setFormStep(3);
        } else {
            setFormStep(4);
        }
    };

    return (
        <div className="border border-primary rounded-xl p-3 lg:p-5">
            <h5 className="lg:text-xl font-bold pb-3 border-b border-[#6B706C]">
                Enter your name and phone
            </h5>

            <div className={"grid pt-4"}>
                <Form<TStudentFromData>
                    onSubmit={findStudentHandler}
                    defaultValues={studentDefaultValues}
                    resolver={zodResolver(
                        StudentResolvers.createStudentValidationSchema
                    )}
                >
                    <div className="grid gap-2">
                        <InputField
                            name="name"
                            placeholder="Name"
                            label="Name"
                        />
                        <InputField
                            name="phone"
                            placeholder="Phone"
                            label="Phone"
                        />
                        <FormButton>Next</FormButton>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UserInfoForm;
