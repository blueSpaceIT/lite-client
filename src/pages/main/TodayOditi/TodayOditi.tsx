import { useEffect, useState } from "react";
import { examService } from "../../../store/services/examService";
import ContainerSM from "../../../components/common/Container/ContainerSM";
import TitleCardOne from "../../../components/common/TitleCardOne/TitleCardOne";
import examBackground from "/exam-bg.png";
import examImg from "/exam.png";
import { Link } from "react-router-dom";
import type { TCourseContent } from "../../../types";

const Timer = ({
    date,
    setRemaining,
}: {
    date: Date;
    setRemaining: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const [remainingTime, setRemainingTime] = useState<{
        h: string;
        m: string;
        s: string;
    }>({
        h: "00",
        m: "00",
        s: "00",
    });

    const formatTime = (ms: number) => {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        if (totalSeconds <= 0) {
            return {
                h: "00",
                m: "00",
                s: "00",
            };
        }
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return {
            h: h.toString().padStart(2, "0"),
            m: m.toString().padStart(2, "0"),
            s: s.toString().padStart(2, "0"),
        };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const end = new Date(date).getTime();
            const diff = end - now;
            const formatted = formatTime(diff);

            setRemainingTime(formatted);
            setRemaining(diff > 0 ? diff : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [date, setRemaining]);

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

const ExamCard = ({ exam }: { exam: TCourseContent }) => {
    const [remaining, setRemaining] = useState<number>(0);

    return (
        <div className="relative flex justify-between lg:justify-start items-center gap-2 lg:gap-10 z-0 p-4">
            <div>
                <img
                    src={examBackground}
                    alt=""
                    className="size-full object-cover object-center absolute top-0 left-0 -z-10 rounded-xl"
                />
            </div>
            {remaining > 0 ? (
                <Link
                    to={`/my-course/${exam.course.id}/module/${exam.module.id}/exam/${exam.id}`}
                >
                    <div>
                        <h4 className="lg:text-lg">
                            {exam.content.exam?.title}
                        </h4>
                        <p className="text-xs lg:text-sm">
                            {exam.content.exam?.totalQuestions} Questions
                        </p>
                    </div>
                </Link>
            ) : (
                <div>
                    <h4 className="lg:text-lg">{exam.content.exam?.title}</h4>
                    <p className="text-xs lg:text-sm">
                        {exam.content.exam?.totalQuestions} Questions
                    </p>
                </div>
            )}
            <div>
                <Timer
                    date={exam.content.exam?.validity as Date}
                    setRemaining={setRemaining}
                />
            </div>
            <div className="hidden lg:block w-60 absolute -right-10 bottom-0">
                <img src={examImg} alt="" />
            </div>
        </div>
    );
};

const TodayOditi = () => {
    const [exams, setExams] = useState<TCourseContent[]>([]);
    const { data, isSuccess } = examService.useGetTodaysExamsQuery(undefined);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setExams(data.data.result);
        }
    }, [data, isSuccess]);

    return (
        <div className="my-8">
            {exams.length > 0 ? (
                <div className="bg-[#F5FFF9] py-10">
                    <ContainerSM>
                        <TitleCardOne text="আজকের পরীক্ষাসমূহ" />

                        <div className="grid gap-5">
                            {exams.map((exam) => (
                                <ExamCard key={exam._id} exam={exam} />
                            ))}
                        </div>
                    </ContainerSM>
                </div>
            ) : (
                <p className="text-lg lg:text-xl text-center py-10">
                    আজকে কোনো পরীক্ষা নাই
                </p>
            )}
        </div>
    );
};

export default TodayOditi;
