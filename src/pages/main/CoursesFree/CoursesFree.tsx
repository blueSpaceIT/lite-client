import { useSearchParams } from "react-router-dom";
import Container from "../../../components/common/Container/Container";
import Pagination from "../../../components/common/Pagination/Pagination";
import TitleCardOne from "../../../components/common/TitleCardOne/TitleCardOne";
import CourseCard from "../../../features/course/components/CourseCard/CourseCard";
import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import type { TCourse, TCourseCategory, TMeta } from "../../../types";
import { courseService } from "../../../store/services/courseService";
import { courseCategoryService } from "../../../store/services/courseCategoryService";

const CoursesFree = () => {
    const [courses, setCourses] = useState<TCourse[]>([]);
    const [meta, setMeta] = useState<TMeta>({
        page: 1,
        limit: 10,
        totalPage: 1,
        totalDoc: 0,
    });
    const [categories, setCategories] = useState<TCourseCategory[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: categoriesData, isSuccess: categoriesSuccess } =
        courseCategoryService.useGetCourseCategoriesQuery([
            ["sort", "createdAt"],
        ]);
    const { data, isSuccess } = courseService.useGetFreeCoursesQuery(
        searchParams
            ? [...searchParams, ["status", "Active"], ["type", "Online"]]
            : [
                  ["status", "Active"],
                  ["type", "Online"],
              ]
    );

    useEffect(() => {
        if (categoriesSuccess && categoriesData) {
            setCategories(categoriesData?.data?.result);
        }
    }, [categoriesData, categoriesSuccess]);

    useEffect(() => {
        if (isSuccess && data) {
            setCourses(data?.data?.result);
            setMeta(data?.data?.meta);
        }
    }, [data, isSuccess]);

    return (
        <div className="pt-8 pb-5 bg-gradient-to-r from-[#090913]  to-[#0d0d15]">
            <Container>
                <TitleCardOne text="Our Free Courses" />

                <div className="overflow-x-auto">
                    <div className="w-max flex gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category._id}
                                onClick={() =>
                                    setSearchParams({ category: category._id })
                                }
                                className="flex items-center gap-2 bg-gradient-to-r from-[#770002] to-[#D70000] text-white px-3 py-2 rounded-lg cursor-pointer text-xs lg:text-base"
                            >
                                <img
                                    src={category.image}
                                    alt=""
                                    className="w-4 lg:w-6"
                                />
                                <span>{category.name}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </Container>

            <div className="bg-gradient-to-r from-[#090913]  to-[#0d0d15] py-6 my-5">
                <Container>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8 xl:gap-10 mb-6">
                        {courses.map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div>

                    <Pagination meta={meta} setSearchParams={setSearchParams} />
                </Container>
            </div>
        </div>
    );
};

export default CoursesFree;
