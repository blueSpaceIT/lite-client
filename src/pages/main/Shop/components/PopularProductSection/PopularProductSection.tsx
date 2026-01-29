import { useEffect, useState } from "react";
import type { TMeta, TProduct } from "../../../../../types";
import { useSearchParams } from "react-router-dom";
import { productService } from "../../../../../store/services/productService";
import ProductCard from "../../../../../features/product/components/ProductCard/ProductCard";
import Pagination from "../../../../../components/common/Pagination/Pagination";

const PopularProductSection = () => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const [meta, setMeta] = useState<TMeta>({
        page: 1,
        limit: 10,
        totalPage: 1,
        totalDoc: 0,
    });
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, isSuccess } = productService.useGetProductsQuery(
        searchParams
            ? [...searchParams, ["isPopular", true]]
            : [["isPopular", true]]
    );

    useEffect(() => {
        if (isSuccess && data) {
            setProducts(data?.data?.result);
            setMeta(data?.data?.meta);
        }
    }, [data, isSuccess]);

    return (
        <div className="mb-12">
            <h4 className="text-lg lg:text-xl">Popular Books</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 py-4">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <Pagination meta={meta} setSearchParams={setSearchParams} />
        </div>
    );
};

export default PopularProductSection;
