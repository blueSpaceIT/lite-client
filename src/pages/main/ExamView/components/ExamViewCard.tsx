import { Link } from "react-router-dom";
import type { TCourseContent } from "../../../../types";
import localeDate from "../../../../utils/localeDate";
import { Button } from "@headlessui/react";

const ExamContentRow = ({ title, text }: { title: string; text: string }) => {
    return (
        <p className="flex justify-between gap-2 py-1 mb-1 border-b border-black/15 text-xs lg:text-sm">
            <span>{title}</span>
            <span className="text-right">{text}</span>
        </p>
    );
};

const ExamViewCard = ({ exam }: { exam: TCourseContent }) => {
    return (
        <div>
            <div className="grid gap-3">
                <div className="py-10">
                    <div className="max-w-[500px] md:w-full md:mx-auto px-5 py-7 border border-primary rounded-2xl">
                        <h4 className="text-2xl lg:text-3xl font-semibold text-center mb-6">
                            Exam
                        </h4>

                        <div className="shadow-[0px_0px_2px_2px_rgb(0,0,0,0.1)] p-3.5 rounded-xl">
                            <ExamContentRow
                                key={1}
                                title="Type"
                                text={exam.content.exam?.type as string}
                            />
                            <ExamContentRow
                                key={2}
                                title="Title"
                                text={exam.content.exam?.title as string}
                            />
                            <ExamContentRow
                                key={3}
                                title="Duration"
                                text={
                                    (String(
                                        exam.content.exam?.duration.hours || 0
                                    ) +
                                        "hr " +
                                        String(
                                            exam.content.exam?.duration
                                                .minutes || 0
                                        ) +
                                        "min " +
                                        String(
                                            exam.content.exam?.duration
                                                .seconds || 0
                                        ) +
                                        "sec") as string
                                }
                            />
                            <ExamContentRow
                                key={4}
                                title="Questions"
                                text={
                                    String(exam.content.exam?.totalQuestions) ||
                                    ""
                                }
                            />
                            <ExamContentRow
                                key={5}
                                title="Full Mark"
                                text={
                                    String(exam.content.exam?.totalMarks) || ""
                                }
                            />
                            <ExamContentRow
                                key={6}
                                title="Pass Mark"
                                text={
                                    String(exam.content.exam?.passingMarks) ||
                                    ""
                                }
                            />
                            {exam.content.exam?.type === "MCQ" && (
                                <ExamContentRow
                                    key={9}
                                    title="Negative Mark"
                                    text={
                                        String(
                                            exam.content.exam?.negativeMarks
                                        ) || ""
                                    }
                                />
                            )}
                            <ExamContentRow
                                key={7}
                                title="Start Time"
                                text={
                                    String(
                                        localeDate(exam.scheduledAt as Date)
                                    ) || ""
                                }
                            />
                            <ExamContentRow
                                key={8}
                                title="End Time"
                                text={
                                    String(
                                        localeDate(
                                            exam.content.exam?.validity as Date
                                        )
                                    ) || ""
                                }
                            />
                            <div className="flex justify-center items-center">
                                <Link
                                    to={`/my-course/${exam.course.id}/module/${exam.module.id}/exam/${exam.id}/attempt`}
                                >
                                    <Button
                                        className={
                                            "rounded bg-primary px-4 py-2 text-sm text-white cursor-pointer mt-3"
                                        }
                                    >
                                        Start Exam
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamViewCard;
