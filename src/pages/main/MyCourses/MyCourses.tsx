import { useEffect, useState } from "react";
import type { TMeta, TPurchase } from "../../../types";
import { purchaseService } from "../../../store/services/purchaseService";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/common/Pagination/Pagination";
import Container from "../../../components/common/Container/Container";
import Sidebar from "../../../components/layouts/Sidebar";
import MainContent from "../../../components/layouts/MainContent";
import PurchasedCourseCard from "../../../features/course/components/PurchasedCourseCard/PurchasedCourseCard";

const MyCourses = () => {
    const [courses, setCourses] = useState<TPurchase[]>([]);
    const [meta, setMeta] = useState<TMeta>({
        page: 1,
        limit: 10,
        totalPage: 1,
        totalDoc: 0,
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isSuccess } = purchaseService.useGetMyPurchasesQuery(
        searchParams ? [...searchParams] : undefined
    );

    useEffect(() => {
        if (isSuccess && data) {
            setCourses(data?.data?.result);
            setMeta(data?.data?.meta);
        }
    }, [data, isSuccess]);

    return (
        <div className="py-6 md:py-10 bg-gradient-to-r from-[#090913] to-[#0d0d15]">
            <Container>
                <div className="grid md:grid-cols-8 lg:grid-cols-12 gap-5">
                    <Sidebar />

                    <MainContent>
                        <div>
                            <div className="grid gap-3 lg:gap-8 mb-6">
                                {courses.map((item) => (
                                    <PurchasedCourseCard
                                        key={item._id}
                                        course={item.course}
                                        expiredAt={item.expiredAt}
                                    />
                                ))}
                            </div>

                            <Pagination
                                meta={meta}
                                setSearchParams={setSearchParams}
                            />
                        </div>
                    </MainContent>
                </div>
            </Container>
        </div>
    );
};

export default MyCourses;
