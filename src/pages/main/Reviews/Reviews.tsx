import { useEffect, useState } from "react";
import Container from "../../../components/common/Container/Container";
import TitleCardTwo from "../../../components/common/TitleCardTwo/TitleCardTwo";
import ReviewCard from "../../../features/review/components/ReviewCard/ReviewCard";
import type { TCourseReview, TMeta } from "../../../types";
import { useSearchParams } from "react-router-dom";
import { courseReviewService } from "../../../store/services/courseReviewService";
import Pagination from "../../../components/common/Pagination/Pagination";

const Reviews = () => {
    const [reviews, setReviews] = useState<TCourseReview[]>([]);
    const [meta, setMeta] = useState<TMeta>({
        page: 1,
        limit: 10,
        totalPage: 1,
        totalDoc: 0,
    });
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, isSuccess } = courseReviewService.useGetCourseReviewsQuery(
        searchParams
            ? [...searchParams, ["status", "Approved"]]
            : [["status", "Approved"]]
    );

    useEffect(() => {
        if (isSuccess && data) {
            setReviews(data?.data?.result);
            setMeta(data?.data?.meta);
        }
    }, [data, isSuccess]);

    return (
        <div className="bg-gradient-to-r from-[#090913]  to-[#0d0d15] py-5">
            <div className="py-6 lg:py-8 my-5">
                <Container>
                    <TitleCardTwo text="Student Review" />

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8 xl:gap-10 mb-6">
                        {reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                    <Pagination meta={meta} setSearchParams={setSearchParams} />
                </Container>
            </div>
        </div>
    );
};

export default Reviews;
