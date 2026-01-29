import { Link } from "react-router-dom";
import type { TCourseContent, TExamAttempt } from "../../../../types";
import { Button } from "@headlessui/react";

// const ExamContentRow = ({ title, text }: { title: string; text: string }) => {
//     return (
//         <p className="flex justify-between gap-2 py-1 mb-1 border-b border-black/15 text-xs lg:text-sm">
//             <span className="font-semibold text-green-700">{title}</span>
//             <span className="text-right font-medium text-red-500">{text}</span>
//         </p>
//     );
// };

const AttemptResult = ({
    exam,
    attempt,
}: {
    exam: TCourseContent;
    attempt: TExamAttempt;
}) => {
    setTimeout(() => {
        if (localStorage.getItem(`exam-session-${exam.id}`)) {
            localStorage.removeItem(`exam-session-${exam.id}`);
        }
    }, 300);

    return (
        <div className="max-w-[1020px] lg:w-full lg:mx-auto">
            <div className="border border-primary rounded-xl py-6 lg:py-10 my-8 lg:my-12">
                <h3 className="text-xl lg:text-2xl text-center mb-8">
                    {exam?.content.exam?.title}
                </h3>

                <div className="max-w-[500px] md:w-full md:mx-auto shadow-[0px_0px_2px_2px_rgb(0,0,0,0.1)] p-3.5 rounded-xl mb-6">
                    <p className="text-lg text-primary">
                        You have been attempt exam once. Please wait for a while
                        to result publish.
                    </p>
                    {/* <ExamContentRow
                        key={1}
                        title="Questions"
                        text={String(exam.content.exam?.totalQuestions) || ""}
                    />
                    <ExamContentRow
                        key={2}
                        title="Exam Duration"
                        text={
                            String(
                                (exam.content.exam?.duration?.hours || 0) * 60 +
                                    (exam.content.exam?.duration.minutes || 0) +
                                    Math.round(
                                        (exam.content.exam?.duration.seconds ||
                                            0) / 60
                                    )
                            ) + " min"
                        }
                    />
                    <ExamContentRow
                        key={4}
                        title="Pass Mark"
                        text={String(exam.content.exam?.passingMarks) || ""}
                    />
                    {exam.content.exam?.type === "MCQ" && (
                        <ExamContentRow
                            key={5}
                            title="Positive Mark"
                            text={
                                String(exam.content.exam?.positiveMarks) || ""
                            }
                        />
                    )}
                    {exam.content.exam?.type === "MCQ" && (
                        <ExamContentRow
                            key={6}
                            title="Negative Mark"
                            text={
                                String(exam.content.exam?.negativeMarks) || ""
                            }
                        />
                    )} */}
                </div>

                <h3 className="text-xl lg:text-2xl text-center text-green-700 mb-8">
                    {exam.content.exam?.result && (
                        <p>Your Mark {attempt.obtainedMarks}</p>
                    )}
                </h3>
            </div>

            {exam.content.exam?.result && (
                <div className="flex justify-center items-center gap-2">
                    <Link to={`/answers/${exam.course.id}/exam/${exam.id}`}>
                        <Button
                            className={
                                "rounded bg-primary px-4 py-2 text-sm text-white cursor-pointer mt-3"
                            }
                        >
                            Answers
                        </Button>
                    </Link>
                    <Link to={`/leaderboard/${exam.course.id}/exam/${exam.id}`}>
                        <Button
                            className={
                                "rounded bg-primary px-4 py-2 text-sm text-white cursor-pointer mt-3"
                            }
                        >
                            Leaderboard
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AttemptResult;
