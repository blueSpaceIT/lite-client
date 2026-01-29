import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import type {
    TCourse,
    TCourseContent,
    TCourseCurriculum,
} from "../../../types";
import { courseContentService } from "../../../store/services/courseContentService";
import Container from "../../../components/common/Container/Container";
import Curriculum from "../../../components/Curriculum/Curriculum";
import Loader from "../../../components/common/Loader/Loader";
import useTimeDifference from "../../../hooks/useTimeDifference";
import getZoomSignature from "../../../utils/getZoomSignature";
import { useAppSelector } from "../../../store/hook";
import {
    useCurrentToken,
    useCurrentUser,
} from "../../../store/slices/authSlice";
import startMeeting from "../../../utils/startMeeting";
import { Button } from "@headlessui/react";

const LiveclassView = () => {
    const token = useAppSelector(useCurrentToken);
    const user = useAppSelector(useCurrentUser);
    const { courseID, moduleID, liveclassID } = useParams();
    const [course, setCourse] = useState<
        (TCourse & { contents: TCourseCurriculum[] }) | null
    >(null);
    const [liveclass, setLiveclass] = useState<TCourseContent | null>(null);
    const [signature, setSignature] = useState<string>("");
    const { data, isSuccess } =
        courseContentService.useGetPurchasedCourseCurriculumQuery(courseID);
    const {
        data: liveclassData,
        isSuccess: liveclassSuccess,
        isError: liveclassError,
    } = courseContentService.useGetPurchasedSingleCourseContentQuery(
        liveclassID
    );

    useEffect(() => {
        if (isSuccess && data?.data) {
            setCourse(data.data);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (liveclassSuccess && liveclassData?.data) {
            setLiveclass(liveclassData.data);
        }
    }, [liveclassData, liveclassSuccess]);

    const meetingNumber = liveclass?.content.liveClass?.joinID || "";
    const password = liveclass?.content.liveClass?.passcode;
    const expirationSeconds =
        Number(
            useTimeDifference(
                new Date(
                    liveclass?.content?.liveClass?.endTime as Date
                ).getTime(),
                new Date(
                    liveclass?.content?.liveClass?.startTime as Date
                ).getTime()
            )
        ) / 1000;
    const isStartClass = Number(
        useTimeDifference(
            new Date().getTime(),
            new Date(liveclass?.scheduledAt as Date).getTime()
        )
    );

    useEffect(() => {
        if (liveclass && token && isStartClass > 0) {
            const getSignatureHandler = async () => {
                const response = await getZoomSignature(token, {
                    meetingNumber: liveclass?.content.liveClass?.joinID || "",
                    expirationSeconds: expirationSeconds,
                });

                if (response?.data) {
                    setSignature(response.data.signature);
                }
            };

            getSignatureHandler();
        }
    }, [liveclass, token, expirationSeconds, isStartClass]);

    const startMeetingHandler = async () => {
        startMeeting(signature, {
            meetingNumber,
            password: String(password),
            userName: String(user?.name),
            leaveUrl: `https://liteedu.com/my-course/${courseID}/module/${moduleID}/live-class/${liveclassID}`,
        });

        window.location.href = liveclass?.content.liveClass?.joinURL || "/";
    };

    if (liveclassError) {
        return <Navigate to={`/course/${courseID}/purchase`} replace />;
    }

    return (
        <div className="pt-4 pb-5">
            <Container>
                {course ? (
                    <div>
                        <div className="grid md:grid-cols-3 gap-3">
                            <div className="md:col-span-2">
                                <div className="size-full flex justify-center items-center py-10">
                                    {liveclass ? (
                                        <Button
                                            onClick={startMeetingHandler}
                                            className="bg-primary text-white text-sm flex justify-center items-center gap-1.5 px-3.5 py-2 rounded-lg cursor-pointer"
                                        >
                                            Join Class
                                        </Button>
                                    ) : (
                                        "Loading..."
                                    )}
                                </div>
                                {/* <div id="meetingSDKElement"></div> */}
                            </div>

                            <div>
                                <Curriculum
                                    courseID={course.id}
                                    contents={course?.contents}
                                    active={{
                                        moduleID: moduleID as string,
                                        contentID: liveclassID as string,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-10">
                        <Loader />
                    </div>
                )}
            </Container>
        </div>
    );
};

export default LiveclassView;
