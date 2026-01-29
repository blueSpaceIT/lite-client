import { Rate } from "antd";
import profileImg from "/profile.png";
import { FaQuoteLeft } from "react-icons/fa6";
import Container from "../../../../../components/common/Container/Container";
import TitleCardTwo from "../../../../../components/common/TitleCardTwo/TitleCardTwo";
import LinkBtn from "../../../../../components/common/LinkBtn/LinkBtn";
import type { TCourseReview } from "../../../../../types";
import { useEffect, useState } from "react";
import { courseReviewService } from "../../../../../store/services/courseReviewService";

const ReviewCard = ({ review }: { review: TCourseReview }) => {
    return (
        <div className="bg-[#FFF5F5] p-3 lg:p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="size-14 overflow-hidden rounded-full">
                    <img
                        src={review?.student?.image || profileImg}
                        alt=""
                        className="size-full object-center object-cover"
                    />
                </div>
                <div>
                    <h4 className="font-semibold">{review.student.name}</h4>
                    <Rate disabled defaultValue={review.rating} />
                </div>
            </div>

            <div className="relative bg-white px-2 py-5 lg:px-4 rounded-xl">
                <FaQuoteLeft className="size-8 text-[#990000] absolute -top-3 -left-2" />
                {review?.comment}
            </div>
        </div>
    );
};

const ReviewSection = () => {
    const [reviews, setReviews] = useState<TCourseReview[]>([]);
    const { data, isSuccess } = courseReviewService.useGetCourseReviewsQuery([
        ["status", "Approved"],
    ]);

    useEffect(() => {
        if (isSuccess && data) {
            setReviews(data?.data?.result);
        }
    }, [data, isSuccess]);

    return (
        <div className="bg-gradient-to-r from-[#090913]  to-[#0d0d15] py-6 my-5">
            <Container>
                <TitleCardTwo text="Student Review" color="white" />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8 xl:gap-10 mb-6">
                    {reviews.slice(0, 4).map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </div>

                <LinkBtn to="/reviews" text="আরও দেখুন" />
            </Container>
        </div>
    );
};

export default ReviewSection;
