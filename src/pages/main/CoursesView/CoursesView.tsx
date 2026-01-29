import { useEffect, useState, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import profileImg from "/profile.png";
import type { TCourse, TPurchase } from "../../../types";
import { courseService } from "../../../store/services/courseService";
import Loader from "../../../components/common/Loader/Loader";
import Container from "../../../components/common/Container/Container";
import { Button } from "@headlessui/react";
import { FaQuestion, FaRegClock } from "react-icons/fa6";
import {
    IoBookOutline,
    IoNewspaperOutline,
    IoTvOutline,
    IoVideocamOutline,
} from "react-icons/io5";
import DOMPurify from "dompurify";
import RelatedCourseSection from "./components/RelatedCourseSection/RelatedCourseSection";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import Curriculum from "./components/Curriculum/Curriculum";
import { purchaseService } from "../../../store/services/purchaseService";
import ReviewSection from "./components/ReviewSection/ReviewSection";

const CourseCover = ({
    image,
    trailer,
}: {
    image: string;
    trailer: string | null;
}) => {
    return (
        <div className="overflow-hidden rounded-lg mb-3" id="trailer">
            {trailer ? (
                <div>
                    <VideoPlayer videoID={trailer} posterPic={image} />
                </div>
            ) : (
                <img
                    src={image}
                    alt=""
                    className={`size-full object-center object-cover`}
                />
            )}
        </div>
    );
};

const CourseTabBtn = ({
    name,
    tab,
    setTab,
}: {
    name: string;
    tab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <Button
            onClick={() => setTab(name)}
            className={`text-sm lg:text-xl bg-[#E9E7E7] px-2 py-1 lg:px-4 lg:py-2 rounded lg:rounded-xl ${
                tab === name ? "border-b-2 border-primary" : ""
            }`}
        >
            {name}
        </Button>
    );
};

const CourseTabContent = ({
    name,
    tab,
    children,
}: {
    name: string;
    tab: string;
    children: ReactNode;
}) => {
    return <div className={`${tab === name ? "" : "hidden"}`}>{children}</div>;
};

const CoursesView = () => {
    const { courseID } = useParams();
    const [video, setVideo] = useState<string | null>(null);
    const [tab, setTab] = useState<string>("Overview");
    const [isMyCourse, setIsMyCourse] = useState<TPurchase | null>(null);
    const [course, setCourse] = useState<TCourse | null>(null);
    const [courses, setCourses] = useState<TCourse[]>([]);
    const { data, isSuccess } = courseService.useGetCourseQuery(courseID);
    const { data: isMyCourseData, isSuccess: isMyCourseSuccess } =
        purchaseService.useGetValidPurchaseQuery(courseID);
    const { data: coursesData, isSuccess: coursesSuccess } =
        courseService.useGetCoursesQuery(
            [
                ["category", course?.category?._id],
                ["status", "Active"],
                ["type", "Online"],
            ],
            { skip: !course }
        );

    useEffect(() => {
        if (isSuccess && data?.data) {
            setCourse(data.data);
            setVideo(data.data?.trailer);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (isMyCourseSuccess && isMyCourseData?.data) {
            setIsMyCourse(isMyCourseData.data);
        }
    }, [isMyCourseData, isMyCourseSuccess]);

    useEffect(() => {
        if (coursesSuccess && coursesData?.data) {
            setCourses(coursesData.data.result);
        }
    }, [coursesData, coursesSuccess]);

    if (course?.type === "Offline") {
        return <Navigate to={"/courses"} replace />;
    }

    return (
        <div className="pt-4 pb-5">
            <Container>
                {course ? (
                    <div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="h-max p-3 lg:p-6 rounded-lg lg:rounded-xl border border-[#CDC9C9] lg:col-span-2">
                                <h4 className="text-lg lg:text-3xl mb-2 lg:mb-5">
                                    {course?.name}
                                </h4>
                                {course?.shortDescription && (
                                    <p className="text-xs lg:text-lg mb-3 lg:mb-5">
                                        {course?.shortDescription}
                                    </p>
                                )}
                                <CourseCover
                                    image={course.image}
                                    trailer={video}
                                />
                                <div className="flex justify-between items-center gap-2">
                                    {[
                                        "Overview",
                                        "Teachers",
                                        "Routine",
                                        "Review",
                                    ].map((item) => (
                                        <CourseTabBtn
                                            key={item}
                                            name={item}
                                            tab={tab}
                                            setTab={setTab}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="h-max p-3 rounded-lg border border-[#CDC9C9]">
                                {course?.price === 0 ? (
                                    <p className="text-sm md:text-xl text-lime-500 pb-2 border-b border-[#CDC9C9] mb-2.5">
                                        Free
                                    </p>
                                ) : (
                                    <p className="text-sm lg:text-xl text-primary pb-2 border-b border-[#CDC9C9] mb-2.5">
                                        ৳{" "}
                                        {course?.offerPrice
                                            ? course?.offerPrice
                                            : course?.price}{" "}
                                        {course?.offerPrice ? (
                                            <span className="text-[10px] lg:text-base line-through">
                                                ৳ {course?.price}
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </p>
                                )}
                                <div className="grid gap-2 text-xs lg:text-sm">
                                    <div className="flex justify-between items-center gap-2 pb-1 rounded border-b border-[#CDC9C9]">
                                        <p className="flex items-center gap-1 lg:gap-1.5">
                                            <FaRegClock className="size-3 lg:size-4" />{" "}
                                            Course Duration
                                        </p>
                                        <p>
                                            {course.duration[0]}{" "}
                                            {course.duration[1]}
                                        </p>
                                    </div>
                                    {course?.details?.totalClasses && (
                                        <div className="flex justify-between items-center gap-2 pb-1 rounded border-b border-[#CDC9C9]">
                                            <p className="flex items-center gap-1 lg:gap-1.5">
                                                <IoBookOutline className="size-3 lg:size-4" />{" "}
                                                Total Classes
                                            </p>
                                            <p>
                                                {course.details.totalClasses}+
                                            </p>
                                        </div>
                                    )}
                                    {course?.details?.totalLiveClasses && (
                                        <div className="flex justify-between items-center gap-2 pb-1 rounded border-b border-[#CDC9C9]">
                                            <p className="flex items-center gap-1 lg:gap-1.5">
                                                <IoVideocamOutline className="size-3 lg:size-4" />{" "}
                                                Live Classes
                                            </p>
                                            <p>
                                                {
                                                    course.details
                                                        .totalLiveClasses
                                                }
                                                +
                                            </p>
                                        </div>
                                    )}
                                    {course?.details?.totalLectures && (
                                        <div className="flex justify-between items-center gap-2 pb-1 rounded border-b border-[#CDC9C9]">
                                            <p className="flex items-center gap-1 lg:gap-1.5">
                                                <IoTvOutline className="size-3 lg:size-4" />{" "}
                                                Recorded Classes
                                            </p>
                                            <p>
                                                {course.details.totalLectures}+
                                            </p>
                                        </div>
                                    )}
                                    {course?.details?.totalNotes && (
                                        <div className="flex justify-between items-center gap-2 pb-1 rounded border-b border-[#CDC9C9]">
                                            <p className="flex items-center gap-1 lg:gap-1.5">
                                                <IoNewspaperOutline className="size-3 lg:size-4" />{" "}
                                                Lecture Sheets
                                            </p>
                                            <p>
                                                {course.details.totalNotes}Pcs
                                            </p>
                                        </div>
                                    )}
                                    {course?.details?.totalExams && (
                                        <div className="flex justify-between items-center gap-2 pb-1 rounded border-b border-[#CDC9C9]">
                                            <p className="flex items-center gap-1 lg:gap-1.5">
                                                <FaQuestion className="size-3 lg:size-4" />{" "}
                                                Total Exams
                                            </p>
                                            <p>{course.details.totalExams}+</p>
                                        </div>
                                    )}
                                </div>
                                {isMyCourse ? (
                                    <Link to={`/my-course/${courseID}`}>
                                        <Button className="w-full text-xs lg:text-base my-2.5 px-3 py-2 text-center text-white bg-primary rounded-lg cursor-pointer">
                                            Already Enrolled
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link to={`/course/${courseID}/purchase`}>
                                        <Button className="w-full text-xs lg:text-base my-2.5 px-3 py-2 text-center text-white bg-primary rounded-lg cursor-pointer">
                                            Enroll Now
                                        </Button>
                                    </Link>
                                )}
                                <div className="text-xs lg:text-base pt-3 pb-1.5 border-t border-[#CDC9C9]">
                                    <p>
                                        কোর্সটি সম্পর্কে বিস্তারিত জানতে কল করুন
                                    </p>
                                    <p>01904433500</p>
                                </div>
                            </div>
                            <div className="lg:col-span-2 py-3 lg:py-6">
                                <CourseTabContent
                                    key="Overview"
                                    name="Overview"
                                    tab={tab}
                                >
                                    <div>
                                        <h4 className="text-xl lg:text-2xl font-bold mb-3">
                                            কোর্স সম্পর্কে বিস্তারিত
                                        </h4>
                                        <div
                                            className="mb-5"
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(
                                                    course?.description || ""
                                                ),
                                            }}
                                        ></div>
                                        <h4 className="text-xl lg:text-2xl font-bold mb-3">
                                            কোর্সের পরিপূর্ণ কারিকুলাম :
                                        </h4>
                                        <div>
                                            <Curriculum
                                                courseID={course._id}
                                                setVideo={setVideo}
                                            />
                                        </div>
                                    </div>
                                </CourseTabContent>

                                <CourseTabContent
                                    key="Teachers"
                                    name="Teachers"
                                    tab={tab}
                                >
                                    <div>
                                        <h4 className="text-xl lg:text-2xl font-bold mb-3">
                                            শিক্ষকমণ্ডলী
                                        </h4>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            {course?.teachers &&
                                                course?.teachers.length > 0 &&
                                                course.teachers.map(
                                                    (teacher) => (
                                                        <div
                                                            key={teacher._id}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <div className="size-16 overflow-hidden rounded-full">
                                                                <img
                                                                    src={
                                                                        teacher?.image ||
                                                                        profileImg
                                                                    }
                                                                    alt=""
                                                                    className="size-full object-center object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold">
                                                                    {
                                                                        teacher.name
                                                                    }
                                                                </h4>
                                                                <p className="text-slate-500 text-sm italic">
                                                                    {
                                                                        teacher.designation
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                </CourseTabContent>

                                <CourseTabContent
                                    key="Routine"
                                    name="Routine"
                                    tab={tab}
                                >
                                    <div>
                                        <h4 className="text-xl lg:text-2xl font-bold mb-3">
                                            রুটিন
                                        </h4>
                                        <div className="flex justify-end">
                                            {course?.routinePDF && (
                                                <a
                                                    href={course.routinePDF}
                                                    target="_blank"
                                                >
                                                    Download Routine
                                                </a>
                                            )}
                                        </div>
                                        {/* <div className="w-full">
                                            {course?.routine && (
                                                <img
                                                    src={course.routine}
                                                    alt=""
                                                    className="w-full"
                                                />
                                            )}
                                        </div> */}
                                    </div>
                                </CourseTabContent>

                                <CourseTabContent
                                    key="Review"
                                    name="Review"
                                    tab={tab}
                                >
                                    <ReviewSection
                                        course={course}
                                        isMyCourse={isMyCourse}
                                    />
                                </CourseTabContent>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-10">
                        <Loader />
                    </div>
                )}
            </Container>

            <RelatedCourseSection
                categoryID={course?.category?._id as string}
                courses={courses}
            />
        </div>
    );
};

export default CoursesView;
