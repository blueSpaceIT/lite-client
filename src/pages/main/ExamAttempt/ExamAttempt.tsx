import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { courseContentService } from "../../../store/services/courseContentService";
import Container from "../../../components/common/Container/Container";
import Loader from "../../../components/common/Loader/Loader";
import MCQAttempt from "./components/MCQAttempt/MCQAttempt";
import type { TCourseContent } from "../../../types";
import CQAttempt from "./components/CQAttempt/CQAttempt";

const ExamAttempt = () => {
    const { courseID, moduleID, examID } = useParams();
    const [exam, setExam] = useState<TCourseContent | null>(null);
    const { data, isSuccess, isError } =
        courseContentService.useGetPurchasedSingleCourseContentQuery(examID);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setExam(data.data);
        }
    }, [data, isSuccess]);

    if (isError) {
        return <Navigate to={`/course/${courseID}/purchase`} replace />;
    }

    return (
        <div className="pt-4 pb-5">
            <Container>
                {exam ? (
                    <div>
                        {exam.content.exam?.type === "MCQ" ? (
                            <MCQAttempt
                                courseID={courseID as string}
                                moduleID={moduleID as string}
                                examID={exam.id}
                                exam={exam.content.exam}
                            />
                        ) : exam.content.exam?.type === "CQ" ? (
                            <CQAttempt
                                courseID={courseID as string}
                                moduleID={moduleID as string}
                                examID={exam.id}
                                exam={exam.content.exam}
                            />
                        ) : (
                            ""
                        )}
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

export default ExamAttempt;
