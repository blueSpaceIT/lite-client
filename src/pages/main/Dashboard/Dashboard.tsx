import { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa6";
import Container from "../../../components/common/Container/Container";
import MainContent from "../../../components/layouts/MainContent";
import Sidebar from "../../../components/layouts/Sidebar";
import { useAppSelector } from "../../../store/hook";
import { dashboardService } from "../../../store/services/dashboarService";
import { offlineEnrollmentService } from "../../../store/services/offlineEnrollmentService";
import { purchaseService } from "../../../store/services/purchaseService";
import { useCurrentUser } from "../../../store/slices/authSlice";
import type { IOfflineEnrollment, TDashboard, TPurchase } from "../../../types";

const DashboardWidgetCard = ({
    text,
    number,
}: {
    text: string;
    number: number;
}) => {
    return (
        <div className="flex justify-between items-center gap-2 border border-slate-400 p-3 rounded-lg">
            <div>
                <p className="text-sm font-bold">{text}</p>
                <h4 className="lg:text-lg font-semibold">{number}</h4>
            </div>

            <div className="size-9 flex justify-center items-center bg-primary text-white rounded-lg">
                <FaWallet className="size-5" />
            </div>
        </div>
    );
};

const Dashboard = () => {
    const user = useAppSelector(useCurrentUser);
    const [widgetCount, setWidgetCount] = useState<TDashboard | null>(null);
    const [onlineCourses, setOnlineCourses] = useState<TPurchase[]>([]);

    const { data, isSuccess } =
        dashboardService.useGetDashboardWidgetCountingQuery(undefined);

    const { data: offlineData } =
        offlineEnrollmentService.useGetStudentOfflineEnrollmentsQuery(
            user?._id as string,
            { skip: !user?._id }
        );

    const { data: onlineData, isSuccess: onlineSuccess } =
        purchaseService.useGetMyPurchasesQuery(undefined);

    useEffect(() => {
        if (isSuccess && data) {
            setWidgetCount(data?.data);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (onlineSuccess && onlineData) {
            setOnlineCourses(onlineData?.data?.result);
        }
    }, [onlineData, onlineSuccess]);

    useEffect(() => {
        console.log("User:", user);
        console.log("Offline Data:", offlineData);
    }, [user, offlineData]);

    const activeEnrollment = offlineData?.data?.find(
        (enrollment: IOfflineEnrollment) => enrollment.status === "Active"
    );

    const offlineCourses = offlineData?.data || [];

    return (
        <div className="py-6 md:py-10 bg-gradient-to-r from-[#090913] to-[#0d0d15] text-white">
            <Container>
                <div className="grid md:grid-cols-8 lg:grid-cols-12 gap-5">
                    <Sidebar />

                    <MainContent>
                        <div>
                            <div className="flex justify-end items-center text-sm font-semibold tracking-wider mb-5">
                                Your ID: {user?.id}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-6 mb-8">
                                <DashboardWidgetCard
                                    key={1}
                                    text="Courses"
                                    number={widgetCount?.courses || 0}
                                />
                                <DashboardWidgetCard
                                    key={2}
                                    text="Exams"
                                    number={widgetCount?.exams || 0}
                                />
                                <DashboardWidgetCard
                                    key={3}
                                    text="Orders"
                                    number={widgetCount?.orders || 0}
                                />
                                <DashboardWidgetCard
                                    key={4}
                                    text="E-books"
                                    number={widgetCount?.ebooks || 0}
                                />

                                {activeEnrollment && (
                                    <>
                                        <DashboardWidgetCard
                                            key={5}
                                            text="Course Fee"
                                            number={activeEnrollment.courseFee}
                                        />
                                        <DashboardWidgetCard
                                            key={6}
                                            text="Paid Amount"
                                            number={activeEnrollment.paidAmount}
                                        />
                                        <DashboardWidgetCard
                                            key={7}
                                            text="Due Amount"
                                            number={activeEnrollment.dueAmount}
                                        />
                                    </>
                                )}
                            </div>

                            <div className="grid lg:grid-cols-2 gap-6">
                                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                    <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Online Courses</h3>
                                    {onlineCourses.length > 0 ? (
                                        <ul className="space-y-3">
                                            {onlineCourses.map((item) => (
                                                <li key={item._id} className="flex justify-between items-center bg-white/5 p-3 rounded">
                                                    <span className="font-medium">{item.course.name}</span>
                                                    <span className={`text-xs px-2 py-1 rounded ${item.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                        {item.status}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-slate-400 text-sm italic">No online courses enrolled</p>
                                    )}
                                </div>

                                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                    <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Offline Courses</h3>
                                    {offlineCourses.length > 0 ? (
                                        <ul className="space-y-3">
                                            {offlineCourses.map((item) => (
                                                <li key={item._id} className="flex justify-between items-center bg-white/5 p-3 rounded">
                                                    <span className="font-medium">{item.class?.title || "N/A"}</span>
                                                    <span className={`text-xs px-2 py-1 rounded ${item.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                        {item.status}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-slate-400 text-sm italic">No offline courses enrolled</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </MainContent>
                </div>
            </Container>
        </div>
    );
};

export default Dashboard;
