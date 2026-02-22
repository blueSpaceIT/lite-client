import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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

                <div className="mb-6 mt-4">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={2}
                        breakpoints={{
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 5 },
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="mySwiper relative"
                    >
                        {categories.map((category) => (
                            <SwiperSlide key={category._id}>
                                <Link
                                    to={`/courses?category=${category._id}`}
                                >
                                    <div
                                        className="flex flex-col justify-center items-center gap-2 bg-gradient-to-r from-green-500/20 via-emerald-500/70 to-green-600/70 text-white px-3 py-4 rounded-lg cursor-pointer text-sm lg:text-xl hover:scale-[1.05] transition-all"
                                    >
                                        <img
                                            src={category.image}
                                            alt=""
                                            className="w-10 lg:w-14 mb-2"
                                        />
                                        <span className="text-center">{category.name}</span>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Container>
        </div>
    );
};

export default CategorySection;
