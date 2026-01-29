import Container from "../../../components/common/Container/Container";
import Sidebar from "../../../components/layouts/Sidebar";
import MainContent from "../../../components/layouts/MainContent";
import type { TMeta, TOrder } from "../../../types";
import { Tag } from "antd";
import { useEffect, useState } from "react";
import { orderService } from "../../../store/services/orderService";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../components/common/Loader/Loader";
import Pagination from "../../../components/common/Pagination/Pagination";
import ViewOrderModal from "./components/ViewOrderModal/ViewOrderModal";

const MyOrders = () => {
    const [orders, setOrders] = useState<TOrder[]>([]);
    const [meta, setMeta] = useState<TMeta>({
        page: 1,
        limit: 10,
        totalPage: 1,
        totalDoc: 0,
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isSuccess, isFetching, isLoading } =
        orderService.useGetMyOrdersQuery(
            searchParams ? [...searchParams] : undefined
        );

    useEffect(() => {
        if (isSuccess && data?.data) {
            setOrders(data.data.result);
            setMeta(data.data.meta);
        }
    }, [data, isSuccess]);

    return (
        <div className="py-6 md:py-10 bg-gradient-to-r from-[#090913] to-[#0d0d15] text-white">
            <Container>
                <div className="grid md:grid-cols-8 lg:grid-cols-12 gap-5">
                    <Sidebar />

                    <MainContent>
                        <div>
                            <h4 className="text-lg font-semibold mb-6">
                                My Orders
                            </h4>

                            <div className="border border-primary rounded-xl p-3 mt-4 overflow-x-auto mb-5">
                                <table className="w-max lg:w-full">
                                    <thead className="bg-primary">
                                        <tr>
                                            <th>OID</th>
                                            <th>Order Type</th>
                                            <th>Status</th>
                                            <th>Pay Status</th>
                                            <th>Pay Method</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isFetching || isLoading ? (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="text-center flex justify-between items-center p-3"
                                                >
                                                    <Loader />
                                                </td>
                                            </tr>
                                        ) : orders.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={8}
                                                    className="text-center"
                                                >
                                                    No Order found
                                                </td>
                                            </tr>
                                        ) : (
                                            orders.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>
                                                        {item?.orderType ===
                                                        "ebook" ? (
                                                            <Tag color="purple">
                                                                {
                                                                    item?.orderType
                                                                }
                                                            </Tag>
                                                        ) : (
                                                            <Tag color="magenta">
                                                                {
                                                                    item?.orderType
                                                                }
                                                            </Tag>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item?.status ===
                                                        "Delivered" ? (
                                                            <Tag color="green">
                                                                {item?.status}
                                                            </Tag>
                                                        ) : item?.status ===
                                                          "Cancelled" ? (
                                                            <Tag color="volcano">
                                                                {item?.status}
                                                            </Tag>
                                                        ) : item?.status ===
                                                          "Pending" ? (
                                                            <Tag color="gold">
                                                                {item?.status}
                                                            </Tag>
                                                        ) : item?.status ===
                                                          "On Hold" ? (
                                                            <Tag color="purple">
                                                                {item?.status}
                                                            </Tag>
                                                        ) : item?.status ===
                                                          "Accepted" ? (
                                                            <Tag color="cyan">
                                                                {item?.status}
                                                            </Tag>
                                                        ) : item?.status ===
                                                          "Out for delivery" ? (
                                                            <Tag color="lime">
                                                                {item?.status}
                                                            </Tag>
                                                        ) : (
                                                            <Tag color="magenta">
                                                                {item?.status}
                                                            </Tag>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item?.payStatus ===
                                                        "Paid" ? (
                                                            <Tag color="green">
                                                                {
                                                                    item?.payStatus
                                                                }
                                                            </Tag>
                                                        ) : item?.payStatus ===
                                                          "Pending" ? (
                                                            <Tag color="gold">
                                                                {
                                                                    item?.payStatus
                                                                }
                                                            </Tag>
                                                        ) : item?.payStatus ===
                                                          "Refunded" ? (
                                                            <Tag color="volcano">
                                                                {
                                                                    item?.payStatus
                                                                }
                                                            </Tag>
                                                        ) : (
                                                            <Tag color="magenta">
                                                                {
                                                                    item?.payStatus
                                                                }
                                                            </Tag>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item?.payMethod ===
                                                        "Cash On Delivery" ? (
                                                            <Tag color="cyan">
                                                                {
                                                                    item?.payMethod
                                                                }
                                                            </Tag>
                                                        ) : item?.payMethod ===
                                                          "Payment Gateway" ? (
                                                            <Tag color="pink">
                                                                {
                                                                    item?.payMethod
                                                                }
                                                            </Tag>
                                                        ) : (
                                                            <Tag color="magenta">
                                                                {
                                                                    item?.payMethod
                                                                }
                                                            </Tag>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <ViewOrderModal
                                                            order={item}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {!isFetching && !isLoading && isSuccess && (
                                <Pagination
                                    meta={meta}
                                    setSearchParams={setSearchParams}
                                />
                            )}
                        </div>
                    </MainContent>
                </div>
            </Container>
        </div>
    );
};

export default MyOrders;
