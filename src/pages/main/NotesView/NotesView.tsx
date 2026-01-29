import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import type {
    TCourse,
    TCourseContent,
    TCourseCurriculum,
} from "../../../types";
import { courseContentService } from "../../../store/services/courseContentService";
import Container from "../../../components/common/Container/Container";
import Curriculum from "../../../components/Curriculum/Curriculum";
import Loader from "../../../components/common/Loader/Loader";
import DOMPurify from "dompurify";
import { Button } from "@headlessui/react";
import { FaDownload } from "react-icons/fa6";

const NotesView = () => {
    const { courseID, moduleID, noteID } = useParams();
    const [course, setCourse] = useState<
        (TCourse & { contents: TCourseCurriculum[] }) | null
    >(null);
    const [note, setNote] = useState<TCourseContent | null>(null);
    const { data, isSuccess } =
        courseContentService.useGetPurchasedCourseCurriculumQuery(courseID);
    const {
        data: noteData,
        isSuccess: noteSuccess,
        isError: noteError,
    } = courseContentService.useGetPurchasedSingleCourseContentQuery(noteID);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setCourse(data.data);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (noteSuccess && noteData?.data) {
            setNote(noteData.data);
        }
    }, [noteData, noteSuccess]);

    if (noteError) {
        return <Navigate to={`/course/${courseID}/purchase`} replace />;
    }

    return (
        <div className="pt-4 pb-5">
            <Container>
                {course ? (
                    <div>
                        <div className="grid md:grid-cols-3 gap-3">
                            <div className="md:col-span-2">
                                {note ? (
                                    <div>
                                        <h4 className="text-lg lg:text-xl font-black mb-6">
                                            {note?.content.note?.title}
                                        </h4>
                                        <div className="mb-5">
                                            <div
                                                className="mb-5"
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(
                                                        note?.content.note
                                                            ?.description || ""
                                                    ),
                                                }}
                                            ></div>
                                        </div>
                                        <a
                                            href={note?.content.note?.pdfURL}
                                            target="_blank"
                                        >
                                            <Button className="bg-primary text-white text-sm flex justify-center items-center gap-1.5 px-2.5 py-1.5 rounded cursor-pointer">
                                                <span>Download</span>
                                                <FaDownload />
                                            </Button>
                                        </a>
                                    </div>
                                ) : (
                                    "Loading..."
                                )}
                            </div>

                            <div>
                                <Curriculum
                                    courseID={course.id}
                                    contents={course?.contents}
                                    active={{
                                        moduleID: moduleID as string,
                                        contentID: noteID as string,
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

export default NotesView;
