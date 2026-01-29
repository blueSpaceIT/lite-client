import type { TExam, TMCQQuestion } from "../../../../../types";
import DOMPurify from "dompurify";

const MCQAnswers = ({ exam }: { exam: TExam }) => {
    return (
        <div className="columns-1 lg:columns-2 gap-6 py-10">
            {exam?.questions?.map((question, index) => (
                <div key={index} className="mb-6 break-inside-avoid">
                    <div className="flex items-baseline gap-2 font-semibold mb-2">
                        <span>{index + 1}.</span>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    question.question || ""
                                ),
                            }}
                        ></div>
                    </div>
                    <div className="grid gap-1.5 mb-3">
                        {(question as TMCQQuestion).options.map(
                            (option, optionIndex) => {
                                const isCorrect = option === question.answer;
                                let optionClass = "flex items-baseline gap-2";

                                if (isCorrect) {
                                    optionClass =
                                        "bg-green-200 font-bold flex items-baseline gap-2";
                                }

                                const options = ["A", "B", "C", "D"];

                                return (
                                    <div
                                        key={optionIndex}
                                        className={optionClass}
                                    >
                                        <span>({options[optionIndex]})</span>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(
                                                    option || ""
                                                ),
                                            }}
                                        ></div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                    <div>
                        <p>Explaination:</p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    question?.explaination || ""
                                ),
                            }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MCQAnswers;
