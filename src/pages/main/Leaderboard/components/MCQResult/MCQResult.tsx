import { Tag } from "antd";
import type { TExamAttempt } from "../../../../../types";
import timeDiffInMin from "../../../../../utils/timeDiffInMin";

const MCQResult = ({ attempts }: { attempts: TExamAttempt[] }) => {
    return (
        <table className="w-max lg:w-full">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Rank</th>
                    <th>Mark</th>
                    <th>Status</th>
                    <th>Provide Ans</th>
                    <th>Right Ans</th>
                    <th>Wrong Ans</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {attempts.length === 0 ? (
                    <tr>
                        <td colSpan={8} className="text-center">
                            No ranking found
                        </td>
                    </tr>
                ) : (
                    attempts.map((item, index) => (
                        <tr key={index}>
                            <td>{item.student.name}</td>
                            <td>{index + 1}</td>
                            <td>{item.obtainedMarks}</td>
                            <td>
                                {item.isPassed ? (
                                    <Tag color="green">Pass</Tag>
                                ) : (
                                    <Tag color="volcano">Fail</Tag>
                                )}
                            </td>
                            <td>
                                {(Number(item?.right) || 0) +
                                    (Number(item?.wrong) || 0)}
                            </td>
                            <td>{String(item?.right)}</td>
                            <td>{String(item?.wrong)}</td>
                            <td>
                                {timeDiffInMin(
                                    item.submitTime,
                                    item.startTime
                                ) + "min"}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default MCQResult;
