import Container from "../../../../../components/common/Container/Container";
import LinkBtn from "../../../../../components/common/LinkBtn/LinkBtn";
import TitleCardOne from "../../../../../components/common/TitleCardOne/TitleCardOne";
import CourseCard from "../../../../../features/course/components/CourseCard/CourseCard";
import type { TCourse } from "../../../../../types";

const RelatedCourseSection = ({
    categoryID,
    courses,
}: {
    categoryID: string;
    courses: TCourse[];
}) => {
    return (
        <div className="bg-[#F5FFF9] py-6 my-5">
            <Container>
                <TitleCardOne text="আপনার জন্য আরও কিছু কোর্স" />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8 xl:gap-10 mb-6">
                    {courses.slice(0, 3).map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>

                <LinkBtn
                    to={`/courses?category=${categoryID}`}
                    text="আরও দেখুন"
                />
            </Container>
        </div>
    );
};

export default RelatedCourseSection;
