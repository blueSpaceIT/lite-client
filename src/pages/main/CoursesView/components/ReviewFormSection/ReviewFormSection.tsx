import type z from "zod";
import { useAppSelector } from "../../../../../store/hook";
import { useCurrentUser } from "../../../../../store/slices/authSlice";
import type {
    TCourse,
    TCourseReview,
    TData,
    TError,
} from "../../../../../types";
import { CourseReviewResolvers } from "../../../../../resolvers/courseReview.resolvers";
import { courseReviewService } from "../../../../../store/services/courseReviewService";
import toast from "react-hot-toast";
import Form from "../../../../../components/common/Form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaField from "../../../../../components/common/Form/TextareaField";
import RateField from "../../../../../components/common/Form/RateField";
import FormButton from "../../../../../components/common/Form/FormButton";

const ReviewFormSection = ({ course }: { course: TCourse }) => {
    const user = useAppSelector(useCurrentUser);
    const defaultValues = {
        course: course.id,
        student: user?.id,
        rating: 5,
        comment: "",
    };

    type TCreateReviewData = z.infer<
        typeof CourseReviewResolvers.createCourseReviewValidationSchema
    >;

    const [createReview] = courseReviewService.useCreateCourseReviewMutation();

    const createReviewHandler = async (data: TCreateReviewData) => {
        const toastID = toast.loading("Wait a while");
        const result = await createReview(data);
        if (result?.error) {
            toast.error((result?.error as TError)?.data?.message, {
                id: toastID,
            });
        }

        if (result?.data as TData<TCourseReview>) {
            toast.success("Create successful", { id: toastID });
            window.location.reload();
        }
    };

    return (
        <div>
            <Form
                onSubmit={createReviewHandler}
                defaultValues={defaultValues}
                resolver={zodResolver(
                    CourseReviewResolvers.createCourseReviewValidationSchema
                )}
            >
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <RateField name="rating" label="Rating" />
                    <TextareaField
                        name="comment"
                        placeholder="Comment"
                        label="Leave your comment"
                    />
                </div>
                <div className="flex justify-center">
                    <FormButton>Submit</FormButton>
                </div>
            </Form>
        </div>
    );
};

export default ReviewFormSection;
