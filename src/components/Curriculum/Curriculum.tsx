import { MdOutlineLock } from "react-icons/md";
import { useEffect, useState, type CSSProperties } from "react";
import { IoIosArrowForward } from "react-icons/io";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import localeDate from "../../utils/localeDate";
import useTimeDifference from "../../hooks/useTimeDifference";
import "./Curriculum.css";
import { Link } from "react-router-dom";
import type { TCourseContent, TCourseCurriculum } from "../../types";

type Props = {
    courseID: string;
    contents: TCourseCurriculum[];
    active?: {
        moduleID: string;
        contentID: string;
    };
};

const CurriculumContent = ({
    courseID,
    moduleID,
    content,
    active,
}: {
    courseID: string;
    moduleID: string;
    content: TCourseContent;
    active?: {
        moduleID: string;
        contentID: string;
    };
}) => {
    const [action, setAction] = useState<boolean>(false);
    const contentTitle =
        content.type === "Live Class"
            ? content.content.liveClass?.title
            : content.type === "Lecture"
            ? content.content.lecture?.title
            : content.type === "Note"
            ? content.content.note?.title
            : content.content.exam?.title;
    const urlType =
        content.type === "Live Class"
            ? "live-class"
            : content.type === "Lecture"
            ? "lecture"
            : content.type === "Note"
            ? "note"
            : "exam";
    const nowTime = Date.now();
    const scheduledTime = new Date(content.scheduledAt as Date).getTime();

    const timeDiff = useTimeDifference(nowTime, scheduledTime);

    useEffect(() => {
        setAction(timeDiff >= 0);
    }, [timeDiff]);

    return (
        <div className="flex justify-between items-center gap-3 py-1.5 border-b border-dashed border-slate-500">
            <div>
                <h6 className="text-slate-500 italic text-[8px] lg:text-xs">
                    {content.type === "Lecture"
                        ? "Recorded Class"
                        : content.type}{" "}
                    {action === true
                        ? ""
                        : ` - ${localeDate(content.scheduledAt as Date)}`}
                </h6>
                {action ? (
                    <Link
                        to={`/my-course/${courseID}/module/${moduleID}/${urlType}/${content.id}`}
                    >
                        <h4
                            className={`text-[10px] lg:text-sm cursor-pointer ${
                                active?.contentID === content.id
                                    ? "text-primary font-bold"
                                    : "text-black font-semibold"
                            }`}
                        >
                            {contentTitle}
                        </h4>
                    </Link>
                ) : (
                    <h4 className="text-[10px] lg:text-sm font-semibold">
                        {contentTitle}
                    </h4>
                )}
            </div>
            <div className="text-xs lg:text-sm text-slate-500">
                {action === true ? "" : <MdOutlineLock />}
            </div>
        </div>
    );
};

const CurriculumContentList = ({
    courseID,
    moduleID,
    contents,
    active,
}: {
    courseID: string;
    moduleID: string;
    contents: TCourseContent[];
    active?: {
        moduleID: string;
        contentID: string;
    };
}) => {
    const contentList = contents || [];

    return (
        <div className="grid gap-2">
            {contentList.map((item) => (
                <CurriculumContent
                    key={item.id}
                    courseID={courseID}
                    moduleID={moduleID}
                    content={item}
                    active={active}
                />
            ))}
        </div>
    );
};

const Curriculum = ({ courseID, contents, active }: Props) => {
    const { token } = theme.useToken();

    const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
        panelStyle
    ) =>
        contents.map((item) => {
            return {
                key: item.id,
                label: item.name,
                children: (
                    <CurriculumContentList
                        courseID={courseID}
                        moduleID={item.id}
                        contents={item.contents}
                        active={active}
                    />
                ),
                style: panelStyle,
            };
        });

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: "none",
    };

    return (
        <div className="max-h-[550px] overflow-y-auto">
            <Collapse
                bordered={false}
                defaultActiveKey={active?.moduleID || [contents[0].id]}
                accordion
                expandIcon={({ isActive }) => (
                    <IoIosArrowForward
                        className={`${
                            isActive ? "rotate-90" : "rotate-0"
                        } transition-all`}
                    />
                )}
                style={{ background: "white" }}
                items={getItems(panelStyle)}
            />
        </div>
    );
};

export default Curriculum;
