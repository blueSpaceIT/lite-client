import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import type {
    TCourse,
    TCourseContent,
    TCourseCurriculum,
} from "../../../types";
import { courseContentService } from "../../../store/services/courseContentService";
import Loader from "../../../components/common/Loader/Loader";
import Curriculum from "../../../components/Curriculum/Curriculum";
import Container from "../../../components/common/Container/Container";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import BunnyPlayer from "../../../components/VideoPlayer/BunnyPlayer";

const LecturesView = () => {
    const { courseID, moduleID, lectureID } = useParams();
    const [course, setCourse] = useState<
        (TCourse & { contents: TCourseCurriculum[] }) | null
    >(null);
    console.log(courseID,moduleID,lectureID)
    const [lecture, setLecture] = useState<TCourseContent | null>(null);
    const { data, isSuccess } =
        courseContentService.useGetPurchasedCourseCurriculumQuery(courseID);
    const {
        data: lectureData,
        isSuccess: lectureSuccess,
        isError: lectureError,
    } = courseContentService.useGetPurchasedSingleCourseContentQuery(lectureID);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setCourse(data.data);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (lectureSuccess && lectureData?.data) {
            setLecture(lectureData.data);
        }
    }, [lectureData, lectureSuccess]);

    if (lectureError) {
        return <Navigate to={`/course/${courseID}/purchase`} replace />;
    }

    const server = lecture?.content?.lecture?.server;
    const videoID = lecture?.content?.lecture?.video as string;
    console.log(lecture)
    console.log(videoID)
    return (
        <div className="pt-4 pb-5">
            <Container>
                {course ? (
                    <div>
                        <div className="grid md:grid-cols-3 gap-3">
                            
                            <div className="md:col-span-2 ">
                                {server === "YouTube" && (
                                    <VideoPlayer videoID={videoID} />
                                        
                                )}

                                {server === "Bunny" && (
                                    <BunnyPlayer videoID={videoID} />
                                )}
                                {
                                    server === "Other" && (
                                        <VideoPlayer videoID={videoID} />
                                        
                                    )   
                                }

                                {!server && "Loading..."}
                            </div>
                            <div>
                                <Curriculum
                                    courseID={course.id}
                                    contents={course?.contents}
                                    active={{
                                        moduleID: moduleID as string,
                                        contentID: lectureID as string,
                                    }}
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

export default LecturesView;
