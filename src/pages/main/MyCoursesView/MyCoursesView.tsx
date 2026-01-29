import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { TCourse, TCourseCurriculum } from "../../../types";
import { courseContentService } from "../../../store/services/courseContentService";
import Container from "../../../components/common/Container/Container";
import Curriculum from "../../../components/Curriculum/Curriculum";
import Loader from "../../../components/common/Loader/Loader";

const MyCoursesView = () => {
    const { courseID } = useParams();
    const [course, setCourse] = useState<
        (TCourse & { contents: TCourseCurriculum[] }) | null
    >(null);
    const { data, isSuccess } =
        courseContentService.useGetPurchasedCourseCurriculumQuery(courseID);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setCourse(data.data);
        }
    }, [data, isSuccess]);

    return (
        <div className="pt-4 pb-5">
            <Container>
                {course ? (
                    <div>
                        <div className="grid md:grid-cols-3 gap-3">
                            <div className="md:col-span-2">
                                <div className="size-full flex justify-center items-center py-10">
                                    <h2 className="text-slate-400 text-3xl lg:text-5xl font-black italic text-center leading-10 lg:leading-16">
                                        Content will be <br />
                                        <span className="text-primary">
                                            Arrived
                                        </span>{" "}
                                        here.
                                    </h2>
                                </div>
                            </div>

                            <div>
                                <Curriculum
                                    courseID={course.id}
                                    contents={course?.contents}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-10">
                        <Loader />
                    </div>
                )}
            </Container>
        </div>
    );
};

export default MyCoursesView;
