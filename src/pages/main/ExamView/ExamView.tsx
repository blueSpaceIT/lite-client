import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { courseContentService } from "../../../store/services/courseContentService";
import Container from "../../../components/common/Container/Container";
import Loader from "../../../components/common/Loader/Loader";
import type { TCourseContent, TExamAttempt, TUser } from "../../../types";
import AttemptResult from "./components/AttemptResult";
import ExamViewCard from "./components/ExamViewCard";
import { examAttemptService } from "../../../store/services/examAttemptService";
import { useAppSelector } from "../../../store/hook";
import { useCurrentUser } from "../../../store/slices/authSlice";

const ExamView = () => {
    const user = useAppSelector(useCurrentUser);
    const { courseID, examID } = useParams();
    const [exam, setExam] = useState<TCourseContent | null>(null);
    const [attempt, setAttempt] = useState<TExamAttempt | null>(null);
    const { data, isSuccess, isError } =
        courseContentService.useGetPurchasedSingleCourseContentQuery(examID);
    const {
        data: attemptData,
        isSuccess: attemptSuccess,
        isLoading: attemptLoading,
        isFetching: attemptFetching,
    } = examAttemptService.useGetExamAttemptQuery({
        userID: (user as TUser).id,
        examID,
    });

    useEffect(() => {
        if (isSuccess && data?.data) {
            setExam(data.data);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (!attemptFetching && attemptSuccess && attemptData?.data) {
            setAttempt(attemptData.data);
        }
    }, [attemptData, attemptSuccess, attemptFetching]);

    if (isError) {
        return <Navigate to={`/course/${courseID}/purchase`} replace />;
    }

    return (
        <div className="pt-4 pb-5">
            <Container>
                {!exam ? (
                    <div className="flex justify-center items-center py-10">
                        <Loader />
                    </div>
                ) : !attemptFetching && !attemptLoading && attempt ? (
                    <AttemptResult exam={exam} attempt={attempt} />
                ) : (
                    <ExamViewCard exam={exam} />
                )}
            </Container>
        </div>
    );
};

export default ExamView;
