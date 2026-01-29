import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";
import examBackground from "/exam-bg.png";
import examImg from "/exam.png";
import type { TCQQuestion, TExam, TError } from "../../../../../types";
import type {
    TCQAnswer,
    TCreateExamAttempt,
} from "../../../../../types/examAttempt.types";
import getExamDurationInMs from "../../../../../utils/getExamDurationInMs";
import { examAttemptService } from "../../../../../store/services/examAttemptService";
import UploaderArray from "../../../../../features/uploader/UploaderArray";
import type { UploadFile, UploadProps } from "antd";
import { useAppSelector } from "../../../../../store/hook";
import { useCurrentToken } from "../../../../../store/slices/authSlice";

const CqAnswerImageUpload = ({
    examID,
    session,
    setSession,
    questionId,
}: {
    examID: string;
    session: TCQLocalSession;
    setSession: React.Dispatch<React.SetStateAction<TCQLocalSession | null>>;
    questionId: string;
}) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const token = useAppSelector(useCurrentToken);

    const uploadHandler: UploadProps["onChange"] = (info) => {
        let newFileList = [...info.fileList];

        newFileList = newFileList.slice(-2);

        newFileList = newFileList.map((file) => {
            if (file.response) {
                file.url = file.response.data.url;
            }
            return file;
        });

        setFileList(newFileList);
        if (!session) return;

        const key = `cq-exam-session-${examID}`;
        const current = JSON.parse(
            localStorage.getItem(key)!
        ) as TCQLocalSession;

        const existing = current.answers.find((a) => a.question === questionId);

        if (existing) {
            existing.answer = newFileList.map((file) => String(file?.url));
        } else {
            current.answers.push({
                question: questionId,
                answer: newFileList.map((file) => String(file?.url)),
            });
        }

        localStorage.setItem(key, JSON.stringify(current));
        setSession({ ...current });
    };

    return (
        <div className="mt-5 mb-5">
            <UploaderArray
                token={token as string}
                actionHandler={uploadHandler}
                fileList={fileList}
                size={{ width: "350", height: "auto" }}
            />
        </div>
    );
};

type TCQLocalSession = {
    examID: string;
    startTime: string;
    endTime: string;
    answers: {
        question: string;
        answer: string[];
    }[];
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

const CQAttempt = ({
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
    const [session, setSession] = useState<TCQLocalSession | null>(null);
    const [remainingTime, setRemainingTime] = useState({
        h: "00",
        m: "00",
        s: "00",
    });

    // Initialize local session
    useEffect(() => {
        if (!exam) return;
        const key = `cq-exam-session-${examID}`;
        const existing = localStorage.getItem(key);

        if (!existing) {
            const startTime = new Date();
            const endTime = new Date(
                startTime.getTime() + getExamDurationInMs(exam.duration)
            );

            const newSession: TCQLocalSession = {
                examID,
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

    // Timer effect
    useEffect(() => {
        if (!session || session.submitted) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const end = new Date(session.endTime).getTime();
            const diff = end - now;

            if (diff <= 0) {
                clearInterval(interval);
                handleAutoSubmit();
            } else {
                setRemainingTime(formatTime(diff));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [session]);

    // Warn before leaving
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
    }, [session]);

    const buildPayload = (): TCreateExamAttempt => {
        if (!session || !exam) throw new Error("Invalid session or exam");
        return {
            exam: examID,
            startTime: new Date(session.startTime),
            endTime: new Date(session.endTime),
            submitTime: new Date(),
            type: "CQ",
            answers: session.answers as TCQAnswer[],
        };
    };

    const [createAttempt] = examAttemptService.useCreateCQExamAttemptMutation();

    const handleSubmit = async () => {
        const toastId = toast.loading("Wait a while");
        if (!session || !exam) return;
        if (session.submitted)
            return toast.success("Already submitted!", { id: toastId });

        try {
            const payload = buildPayload();
            const result = await createAttempt(payload);
            if (result?.error) {
                toast.error((result.error as TError).data?.message, {
                    id: toastId,
                });
                return;
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

    if (exam.type !== "CQ") {
        return <p>This exam type is not supported yet.</p>;
    }

    const cqQuestions = exam.questions as TCQQuestion[];

    return (
        <div className="max-w-3xl mx-auto p-6">
            <ExamCard exam={exam} remainingTime={remainingTime} />

            <div className="space-y-6 mt-8">
                {cqQuestions.map((q, index) => {
                    return (
                        <div
                            key={q._id}
                            className="p-4 rounded-xl border border-gray-300"
                        >
                            <p className="font-medium mb-4 flex gap-1.5">
                                {index + 1}.{" "}
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(q.question),
                                    }}
                                />
                            </p>

                            <CqAnswerImageUpload
                                examID={examID}
                                session={session}
                                setSession={setSession}
                                questionId={q._id}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center my-6">
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
    );
};

export default CQAttempt;
