import { Rate } from "antd";
import { FaQuoteLeft } from "react-icons/fa6";
import profileImg from "/profile.png";
import type { TCourseReview } from "../../../../types";

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

export default ReviewCard;
