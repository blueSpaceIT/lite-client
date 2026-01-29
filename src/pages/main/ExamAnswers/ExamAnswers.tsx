import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import type { TExam } from "../../../types";
import { courseContentService } from "../../../store/services/courseContentService";
import Container from "../../../components/common/Container/Container";
import MCQAnswers from "./components/MCQAnswers/MCQAnswers";
import CQAnswers from "./components/CQAnswers/CQAnswers";
import Loader from "../../../components/common/Loader/Loader";

const ExamAnswers = () => {
    const { courseID, examID } = useParams();
    const [exam, setExam] = useState<TExam | null>(null);
    const { data, isSuccess, isError } =
        courseContentService.useGetPurchasedExamWithAnswerQuery(examID);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setExam(data.data);
        }
    }, [data, isSuccess]);

    if (exam && !exam?.result) {
        return <Navigate to={`/my-course/${courseID}`} replace />;
    }

    if (isError) {
        return <Navigate to={`/course/${courseID}/purchase`} replace />;
    }

    return (
        <div>
            <Container>
                {exam ? (
                    <div>
                        {exam.type === "MCQ" ? (
                            <MCQAnswers exam={exam} />
                        ) : exam.type === "CQ" ? (
                            <CQAnswers exam={exam} />
                        ) : (
                            "No exam found"
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

export default ExamAnswers;
