import { useEffect, useState } from "react";
import Container from "../../../components/common/Container/Container";
import MainContent from "../../../components/layouts/MainContent";
import Sidebar from "../../../components/layouts/Sidebar";
import type { TProduct } from "../../../types";
import { orderService } from "../../../store/services/orderService";
import { Link } from "react-router-dom";

const EbookCard = ({ ebook }: { ebook: TProduct }) => {
    return (
        <div>
            <Link
                to={ebook.fullPDF || "#"}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div>
                    <div className="rounded-xl mb-2 overflow-hidden">
                        <img src={ebook.image} alt="" />
                    </div>
                    <h3 className="font-semibold text-center mb-2">
                        {ebook.name}
                    </h3>
                </div>
            </Link>
        </div>
    );
};

const MyEbooks = () => {
    const [ebooks, setEbooks] = useState<TProduct[]>([]);

    const { data, isSuccess, isFetching, isLoading } =
        orderService.useGetMyEbooksQuery(undefined);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setEbooks(data.data);
        }
    }, [data, isSuccess]);
    console.log(ebooks);

    return (
        <div className="py-6 md:py-10 bg-gradient-to-r from-[#090913] to-[#0d0d15] text-white   ">
            <Container>
                <div className="grid md:grid-cols-8 lg:grid-cols-12 gap-5">
                    <Sidebar />

                    <MainContent>
                        {isLoading || isFetching ? (
                            <p>Loading...</p>
                        ) : ebooks.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {ebooks.map((ebook) => (
                                    <EbookCard key={ebook.id} ebook={ebook} />
                                ))}
                            </div>
                        ) : (
                            <p>No eBooks found.</p>
                        )}
                    </MainContent>
                </div>
            </Container>
        </div>
    );
};

export default MyEbooks;
