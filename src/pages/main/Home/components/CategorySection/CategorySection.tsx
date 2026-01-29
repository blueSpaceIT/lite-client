import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../../../../components/common/Container/Container";
import TitleCardOne from "../../../../../components/common/TitleCardOne/TitleCardOne";
import { courseCategoryService } from "../../../../../store/services/courseCategoryService";
import type { TCourseCategory } from "../../../../../types";

const CategorySection = () => {
    const [categories, setCategories] = useState<TCourseCategory[]>([]);
    const { data, isSuccess } =
        courseCategoryService.useGetCourseCategoriesQuery([
            ["sort", "createdAt"],
        ]);

    useEffect(() => {
        if (isSuccess && data) {
            setCategories(data?.data?.result);
        }
    }, [data, isSuccess]);

    return (
        <div className="bg-gradient-to-r from-[#090913]  to-[#0d0d15] py-6  ">
            <Container>
                <TitleCardOne text="Our Courses" />

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 lg:gap-6 mb-6">
                    {categories.map((category) => (
                        <Link
                            to={`/courses?category=${category._id}`}
                            key={category._id}
                        >
                            <div
                                key={category._id}
                                className="flex flex-col justify-center items-center gap-2 bg-gradient-to-r from-green-500/20 via-emerald-500/70 to-green-600/70 text-white px-3 py-4 rounded-lg cursor-pointer text-sm lg:text-xl hover:scale-[1.1] transition-all"
                            >
                                <img
                                    src={category.image}
                                    alt=""
                                    className="w-10 lg:w-14 mb-2"
                                />
                                <span>{category.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default CategorySection;
