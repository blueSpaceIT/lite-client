import { Navigate, useParams } from "react-router-dom";
import Container from "../../../components/common/Container/Container";
import TitleCardTwo from "../../../components/common/TitleCardTwo/TitleCardTwo";
import type { TCourseContent, TExamAttempt } from "../../../types";
import { courseContentService } from "../../../store/services/courseContentService";
import { examAttemptService } from "../../../store/services/examAttemptService";
import { useEffect, useState } from "react";
import Loader from "../../../components/common/Loader/Loader";
import CQResult from "./components/CQResult/CQResult";
import MCQResult from "./components/MCQResult/MCQResult";

const Leaderboard = () => {
    const { courseID, examID } = useParams();
    const [exam, setExam] = useState<TCourseContent | null>(null);
    const [attempts, setAttempts] = useState<TExamAttempt[]>([]);

    const { data, isSuccess, isError } =
        courseContentService.useGetPurchasedSingleCourseContentQuery(examID);
    const {
        data: attemptsData,
        isSuccess: attemptsSuccess,
        isFetching: attemptsFetching,
    } = examAttemptService.useGetExamAttemptsQuery(examID);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setExam(data.data);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (!attemptsFetching && attemptsSuccess && attemptsData?.data) {
            setAttempts(attemptsData.data);
        }
    }, [attemptsData, attemptsSuccess, attemptsFetching]);

    if (exam && !exam.content.exam?.result) {
        return (
            <Navigate
                to={`/my-course/${courseID}/module/${exam.module.id}/exam/${examID}`}
                replace
            />
        );
    }

    if (isError) {
        return <Navigate to={`/course/${courseID}/purchase`} replace />;
    }

    return (
        <div className="py-10">
            <Container>
                {exam ? (
                    <div>
                        <TitleCardTwo text="Leader Board" />

                        <div className="border border-primary rounded-xl p-3 mt-4 overflow-x-auto">
                            {exam.content.exam?.type === "CQ" ? (
                                <CQResult attempts={attempts} />
                            ) : (
                                <MCQResult attempts={attempts} />
                            )}
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

export default Leaderboard;
