import { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa6";
import Container from "../../../components/common/Container/Container";
import MainContent from "../../../components/layouts/MainContent";
import Sidebar from "../../../components/layouts/Sidebar";
import { useAppSelector } from "../../../store/hook";
import { dashboardService } from "../../../store/services/dashboarService";
import { offlineEnrollmentService } from "../../../store/services/offlineEnrollmentService";
import { useCurrentUser } from "../../../store/slices/authSlice";
import type { IOfflineEnrollment, TDashboard } from "../../../types";

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
    const { data, isSuccess } =
        dashboardService.useGetDashboardWidgetCountingQuery(undefined);

    const { data: offlineData } =
        offlineEnrollmentService.useGetStudentOfflineEnrollmentsQuery(
            user?.id as string,
            { skip: !user?.id }
        );

    useEffect(() => {
        if (isSuccess && data) {
            setWidgetCount(data?.data);
        }
    }, [data, isSuccess]);
    const activeEnrollment = offlineData?.data?.find(
        (enrollment: IOfflineEnrollment) => enrollment.status === "Active"
    );

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

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-6">
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
                        </div>
                    </MainContent>
                </div>
            </Container>
        </div>
    );
};

export default Dashboard;
