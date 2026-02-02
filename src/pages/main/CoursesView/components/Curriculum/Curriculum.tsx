import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import { useEffect, useState, type CSSProperties } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineLock } from "react-icons/md";
import { courseContentService } from "../../../../../store/services/courseContentService";
import type { TCourseContent, TCourseCurriculum } from "../../../../../types";
import "./Curriculum.css";

const CurriculumContent = ({
  content,
  setVideo,
}: {
  content: TCourseContent;
  setVideo: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [action, setAction] = useState<boolean>(false);
  console.log(content);
  const contentTitle =
    content.type === "Live Class"
      ? content.content.liveClass?.title
      : content.type === "Lecture"
        ? content.content.lecture?.title
        : content.type === "Note"
          ? content.content.note?.title
          : content.content.exam?.title;

  useEffect(() => {
    setAction(
      content.type === "Lecture" && content.content.lecture?.isFree === true,
    );
  }, [content]);
  


  return (
    <div className="flex justify-between items-center gap-3 py-1.5 border-b border-dashed border-slate-500">
      <div>
        <h6 className="text-slate-500 italic text-[8px] lg:text-xs">
          {content.type}
        </h6>
        {action ? (
          <h4
            onClick={() => {
              setVideo(content.content.lecture?.video as string);

              document.getElementById("trailer")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="text-[10px] lg:text-sm font-semibold cursor-pointer"
          >
            
            {contentTitle}
          </h4>
        ) : (
          <h4 className="text-[10px] lg:text-sm font-semibold">
            {contentTitle}
          </h4>
        )}
      </div>
      <div className="text-xs lg:text-sm text-slate-500">
        {content.type === "Lecture" &&
        content.content.lecture?.isFree === true ? (
          ""
        ) : (
          <MdOutlineLock />
        )}
      </div>
    </div>
  );
};

const CurriculumContentList = ({
  contents,
  setVideo,
}: {
  contents: TCourseContent[];
  setVideo: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const contentList = contents || [];

  return (
    <div className="grid gap-2">
      {contentList.map((item) => (
        <CurriculumContent key={item._id} content={item} setVideo={setVideo} />
      ))}
    </div>
  );
};

const Curriculum = ({
  courseID,
  setVideo,
}: {
  courseID: string;
  setVideo: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [curriculum, setCurriculum] = useState<TCourseCurriculum[]>([]);
  const { data, isSuccess } = courseContentService.useGetCourseCurriculumQuery([
    ["course", courseID],
  ]);

  useEffect(() => {
    if (isSuccess && data) {
      setCurriculum(data?.data);
    }
  }, [data, isSuccess]);

  const { token } = theme.useToken();
  console.log(data)

  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle,
  ) =>
    curriculum.map((item) => {
      return {
        key: item._id,
        label: item.name,
        children: (
          <CurriculumContentList contents={item.contents} setVideo={setVideo} />
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
    <div>
      {curriculum && curriculum.length > 0 && (
        <Collapse
          bordered={false}
          defaultActiveKey={[curriculum[0]._id]}
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
      )}
    </div>
  );
};

export default Curriculum;
