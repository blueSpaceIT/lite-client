import { useCallback, useEffect, useState } from "react";
import getExamDurationInMs from "../../../../../utils/getExamDurationInMs";
import type {
    TAnswer,
    TCreateExamAttempt,
} from "../../../../../types/examAttempt.types";
import type { TError, TExam, TMCQQuestion } from "../../../../../types";
import DOMPurify from "dompurify";
import examBackground from "/exam-bg.png";
import examImg from "/exam.png";
import { examAttemptService } from "../../../../../store/services/examAttemptService";
import toast from "react-hot-toast";

type TLocalExamSession = {
    examID: string;
    startTime: string;
    endTime: string;
    answers: TAnswer[];
    submitted: boolean;
};

const Timer = ({
    remainingTime,
}: {
    remainingTime: {
        h: string;
        m: string;
        s: string;
    };
}) => {
    return (
        <div className="bg-primary flex gap-1.5 rounded-xl p-3">
            <div className="bg-white rounded-xl p-3">
                <p className="text-xs lg:text-sm">Hr</p>
                <p className="text-sm lg:text-base">{remainingTime.h}</p>
            </div>
            <div className="bg-white rounded-xl p-3">
                <p className="text-xs lg:text-sm">Min</p>
                <p className="text-sm lg:text-base">{remainingTime.m}</p>
            </div>
            <div className="bg-white rounded-xl p-3">
                <p className="text-xs lg:text-sm">Sec</p>
                <p className="text-sm lg:text-base">{remainingTime.s}</p>
            </div>
        </div>
    );
};

const ExamCard = ({
    exam,
    remainingTime,
}: {
    exam: TExam;
    remainingTime: {
        h: string;
        m: string;
        s: string;
    };
}) => {
    return (
        <div className="relative flex justify-between lg:justify-start items-center gap-2 lg:gap-10 z-0 p-4">
            <div>
                <img
                    src={examBackground}
                    alt=""
                    className="size-full object-cover object-center absolute top-0 left-0 -z-10 rounded-xl"
                />
            </div>
            <div>
                <h4 className="lg:text-lg">{exam?.title}</h4>
                <p className="text-xs lg:text-sm">
                    {exam?.totalQuestions} Questions
                </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
                <div>
                    <Timer remainingTime={remainingTime} />
                </div>
            </div>
            <div className="hidden lg:block w-60 absolute -right-10 bottom-0">
                <img src={examImg} alt="" />
            </div>
        </div>
    );
};

const options = ["A", "B", "C", "D"];

const MCQAttempt = ({
    courseID,
    moduleID,
    examID,
    exam,
}: {
    courseID: string;
    moduleID: string;
    examID: string;
    exam: TExam;
}) => {
    const [clickSubmit, setClickSubmit] = useState<boolean>(false);
    const [session, setSession] = useState<TLocalExamSession | null>(null);
    const [remainingTime, setRemainingTime] = useState<{
        h: string;
        m: string;
        s: string;
    }>({
        h: "00",
        m: "00",
        s: "00",
    });

    useEffect(() => {
        if (!exam) return;

        const key = `exam-session-${examID}`;
        const existing = localStorage.getItem(key);

        if (!existing) {
            const startTime = new Date();
            const endTime = new Date(
                startTime.getTime() + getExamDurationInMs(exam.duration)
            );

            const newSession: TLocalExamSession = {
                examID: examID,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                answers: [],
                submitted: false,
            };

            localStorage.setItem(key, JSON.stringify(newSession));
            setSession(newSession);
        } else {
            setSession(JSON.parse(existing));
        }
    }, [exam, examID]);

    useEffect(() => {
        if (!session) return;
        if (session.submitted) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const end = new Date(session.endTime).getTime();
            const diff = end - now;
            const formatted = formatTime(diff);

            if (diff <= 0) {
                clearInterval(interval);
                handleAutoSubmit();
            } else {
                setRemainingTime(formatted);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [session]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (session && !session.submitted && !clickSubmit) {
                e.preventDefault();
                e.returnValue = "You haven’t submitted your exam yet!";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [clickSubmit, session]);

    const handleAnswer = useCallback(
        (questionId: string, answer: string) => {
            if (!exam || !session) return;
            const key = `exam-session-${examID}`;
            const current = JSON.parse(
                localStorage.getItem(key)!
            ) as TLocalExamSession;

            const alreadyAnswered = current.answers.find(
                (a) => a.question === questionId
            );
            if (alreadyAnswered) return;

            current.answers.push({ question: questionId, answer });
            localStorage.setItem(key, JSON.stringify(current));
            setSession({ ...current });
        },
        [exam, examID, session]
    );

    const buildPayload = (): TCreateExamAttempt => {
        if (!session || !exam) throw new Error("Invalid session or exam");
        return {
            exam: examID,
            startTime: new Date(session.startTime),
            endTime: new Date(session.endTime),
            submitTime: new Date(),
            type: "MCQ",
            answers: session.answers,
        };
    };

    const [createMCQAttempt] =
        examAttemptService.useCreateExamAttemptMutation();

    const handleSubmit = async () => {
        const toastId = toast.loading("Wait a while");
        if (!session || !exam) return;
        if (session.submitted)
            return toast.success("Already submitted!", { id: toastId });

        try {
            const payload = buildPayload();
            const result = await createMCQAttempt(payload);
            if (result?.error) {
                toast.error((result?.error as TError)?.data?.message, {
                    id: toastId,
                });
            }

            if (result?.data) {
                toast.success("Submitted successful", {
                    id: toastId,
                });
                window.location.href = `/my-course/${courseID}/module/${moduleID}/exam/${examID}`;
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit exam. Try again.");
        }
    };

    const handleAutoSubmit = async () => {
        if (!session || session.submitted) return;
        await handleSubmit();
    };

    const formatTime = (ms: number) => {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        return {
            h: h.toString().padStart(2, "0"),
            m: m.toString().padStart(2, "0"),
            s: s.toString().padStart(2, "0"),
        };
    };

    if (!exam || !session) return <p>Loading exam...</p>;

    if (exam.type !== "MCQ") {
        return <p>This exam type is not supported yet.</p>;
    }

    const mcqQuestions = exam.questions as TMCQQuestion[];

    return (
        <div className="max-w-3xl mx-auto p-6">
            <ExamCard exam={exam} remainingTime={remainingTime} />

            <div className="space-y-6 mt-8">
                {mcqQuestions.map((q, index) => {
                    const answered = session.answers.find(
                        (a) => a.question === q._id
                    );
                    return (
                        <div
                            key={q._id}
                            className={`p-4 rounded-xl border ${
                                answered
                                    ? "border-sky-400 bg-sky-50"
                                    : "border-gray-200"
                            }`}
                        >
                            <p className="flex gap-1.5 font-medium mb-2">
                                {index + 1}.{" "}
                                <div
                                    className="mb-5"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            q?.question || ""
                                        ),
                                    }}
                                ></div>
                            </p>
                            <ul className="space-y-2">
                                {q.options.map((opt, idx) => (
                                    <li key={idx}>
                                        <button
                                            disabled={
                                                !!answered || session.submitted
                                            }
                                            onClick={() =>
                                                handleAnswer(q._id, opt)
                                            }
                                            className={`w-full text-left px-3 py-2 rounded-md border ${
                                                answered?.answer === opt
                                                    ? "bg-sky-500 text-white border-sky-600"
                                                    : "hover:bg-purple-100 border-gray-300"
                                            }`}
                                        >
                                            <span>({options[idx]})</span>
                                            <div
                                                className="mb-5"
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(
                                                        opt || ""
                                                    ),
                                                }}
                                            ></div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center my-6">
                <div>
                    <button
                        onClick={() => {
                            setClickSubmit(true);
                            handleSubmit();
                        }}
                        disabled={session.submitted}
                        className={`px-4 py-2 rounded ${
                            session.submitted
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-purple-600 hover:bg-purple-700 text-white"
                        }`}
                    >
                        {session.submitted ? "Submitted" : "Submit Exam"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MCQAttempt;
