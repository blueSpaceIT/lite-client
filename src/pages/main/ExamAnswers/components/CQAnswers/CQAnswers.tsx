import type { TCQQuestion, TExam } from "../../../../../types";
import DOMPurify from "dompurify";

const CQAnswers = ({ exam }: { exam: TExam }) => {
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
                    <div>
                        <p>Answer:</p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    (question as TCQQuestion)?.answer || ""
                                ),
                            }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CQAnswers;
