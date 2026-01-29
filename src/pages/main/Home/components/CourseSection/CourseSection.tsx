import { useEffect, useState } from "react";
import Container from "../../../../../components/common/Container/Container";
import LinkBtn from "../../../../../components/common/LinkBtn/LinkBtn";
import TitleCardOne from "../../../../../components/common/TitleCardOne/TitleCardOne";
import CourseCard from "../../../../../features/course/components/CourseCard/CourseCard";
import type { TCourse } from "../../../../../types";
import { courseService } from "../../../../../store/services/courseService";

const CourseSection = () => {
    const [courses, setCourses] = useState<TCourse[]>([]);
    const { data, isSuccess } = courseService.useGetCoursesQuery([
        ["status", "Active"],
        ["type", "Online"],
    ]);

    useEffect(() => {
        if (isSuccess && data) {
            setCourses(data?.data?.result);
        }
    }, [data, isSuccess]);

    return (
        <div className="bg-gradient-to-r from-[#090913]  to-[#0d0d15] py-6 ">
            <Container>
                <TitleCardOne text="Feature Courses" />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8 xl:gap-10 mb-6">
                    {courses.slice(0, 3).map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>

                <LinkBtn to="/courses" text="All Courses" />
            </Container>
        </div>
    );
};

export default CourseSection;
