import { Link } from "react-router-dom";
import { FaClock, FaPlayCircle } from "react-icons/fa";
import { useState } from "react";
import type { TCourse } from "../../../../types";

const CourseCard = ({ course }: { course: TCourse }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Calculate discount percentage
    const discountPercent =
        course?.offerPrice && course?.price > 0
            ? Math.round(
                  ((course.price - course.offerPrice) / course.price) * 100
              )
            : 0;

    // Format price with commas
    // const formatPrice = (price: number) => {
    //     return new Intl.NumberFormat("bn-BD").format(price);
    // };

    return (
        <Link
            to={`/course/${course?.id}`}
            className="group relative bg-white rounded-xl lg:rounded-2xl border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Discount Badge */}
            {discountPercent > 0 && (
                <div className="absolute top-3 left-3 z-10">
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                        {discountPercent}% ছাড়
                    </span>
                </div>
            )}

            {/* Course Image */}
            <div className="relative h-48 lg:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                    src={course?.image}
                    alt={course?.name}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                        isHovered ? "scale-110" : "scale-100"
                    }`}
                />
            </div>

            {/* Content Container */}
            <div className="p-4 lg:p-6">
                {/* Category Tag */}
                <div className="mb-3">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                        {course?.category.name || "কোর্স"}
                    </span>
                </div>

                {/* Course Title */}
                <Link to={`/course/${course?.id}`}>
                    <h3 className="text-base lg:text-lg font-bold text-gray-800 mb-3 line-clamp-2 hover:text-primary transition-colors duration-300 group-hover:text-primary">
                        {course?.name}
                    </h3>
                </Link>

                {/* Course Stats */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                    {/* Students */}
                    {/* <div className="flex items-center gap-2">
                        <FaUsers className="text-gray-400" />
                        <span>{String(course?.enrolledStudents || 0)}</span>
                    </div> */}

                    {/* Duration (optional) */}
                    {course?.duration && (
                        <div className="flex items-center gap-2">
                            <FaClock className="text-gray-400" />
                            <span>{course.duration.join(" ")}</span>
                        </div>
                    )}
                </div>

                {/* Price and CTA Section */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {/* Price */}
                    <div>
                        {course?.price === 0 ? (
                            <div className="text-left">
                                <p className="text-lg lg:text-xl font-bold text-green-600 animate-pulse">
                                    ফ্রি
                                </p>
                            </div>
                        ) : course?.offerPrice && course.offerPrice > 0 ? (
                            <div className="text-left">
                                <p className="text-sm text-gray-500 line-through">
                                    ৳ {String(course.price)}
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="text-lg lg:text-xl font-bold text-gray-800">
                                        ৳ {String(course.offerPrice)}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-lg lg:text-xl font-bold text-gray-800">
                                ৳ {String(course?.price || 0)}
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <Link to={`/course/${course?.id}`}>
                            <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2 text-sm cursor-pointer">
                                <FaPlayCircle /> বিস্তারিত
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hover Effect Border */}
            <div
                className={`absolute inset-0 border-2 border-primary rounded-xl lg:rounded-2xl pointer-events-none transition-all duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                }`}
            ></div>
        </Link>
    );
};

export default CourseCard;
