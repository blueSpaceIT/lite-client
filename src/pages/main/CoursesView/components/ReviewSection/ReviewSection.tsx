import { Rate } from "antd";
import { FaQuoteLeft } from "react-icons/fa6";
import type { TCourse, TCourseReview, TPurchase } from "../../../../../types";
import { useEffect, useState } from "react";
import { courseReviewService } from "../../../../../store/services/courseReviewService";
import ReviewFormSection from "../ReviewFormSection/ReviewFormSection";

const ReviewSection = ({
    course,
    isMyCourse,
}: {
    course: TCourse;
    isMyCourse: TPurchase | null;
}) => {
    const [reviews, setReviews] = useState<TCourseReview[]>([]);
    const [myReview, setMyReview] = useState<TCourseReview | null>(null);
    const { data, isSuccess } = courseReviewService.useGetCourseReviewsQuery([
        ["course", course._id],
        ["status", "Approved"],
    ]);

    const { data: myReviewData, isSuccess: myReviewSuccess } =
        courseReviewService.useGetMyCourseReviewQuery(course.id);

    useEffect(() => {
        if (isSuccess && data) {
            setReviews(data?.data?.result);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (myReviewSuccess && myReviewData) {
            setMyReview(myReviewData?.data);
        }
    }, [myReviewData, myReviewSuccess]);

    return (
        <div>
            <h4 className="text-xl lg:text-2xl font-bold mb-3">রিভিউ</h4>
            <div className="flex flex-col gap-2">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="bg-[#FFF5F5] p-3 lg:p-5 rounded-2xl"
                    >
                        <div className="flex items-center gap-3 mb-4 lg:mb-6">
                            <div className="size-14 overflow-hidden rounded-full">
                                <img
                                    src={
                                        review.student?.image || "/profile.png"
                                    }
                                    alt=""
                                    className="size-full object-center object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold">
                                    {review.student.name}
                                </h4>
                                <Rate disabled defaultValue={review.rating} />
                            </div>
                        </div>

                        <div className="relative bg-white px-2 py-5 lg:px-4 rounded-xl">
                            <FaQuoteLeft className="size-8 text-[#990000] absolute -top-3 -left-2" />
                            {review.comment}
                        </div>
                    </div>
                ))}
            </div>

            {isMyCourse && !myReview && <ReviewFormSection course={course} />}
        </div>
    );
};

export default ReviewSection;
