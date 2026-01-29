import { Tag } from "antd";
import timeDiffInMin from "../../../../../utils/timeDiffInMin";
import type { TExamAttempt } from "../../../../../types";

const CQResult = ({ attempts }: { attempts: TExamAttempt[] }) => {
    return (
        <table className="w-max lg:w-full">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Rank</th>
                    <th>Mark</th>
                    <th>Status</th>
                    <th>Provide Ans</th>
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
                            <td>{String(item.answers?.length)}</td>
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

export default CQResult;
