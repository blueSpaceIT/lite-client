import { useEffect, useState } from "react";
import type { TMeta, TProduct } from "../../../../../types";
import { useSearchParams } from "react-router-dom";
import { productService } from "../../../../../store/services/productService";
import Pagination from "../../../../../components/common/Pagination/Pagination";
import ProductList from "../../../../../features/product/components/ProductList/ProductList";

const ProductSection = () => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const [meta, setMeta] = useState<TMeta>({
        page: 1,
        limit: 10,
        totalPage: 1,
        totalDoc: 0,
    });
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, isSuccess } = productService.useGetProductsQuery(
        searchParams ? [...searchParams] : undefined
    );

    useEffect(() => {
        if (isSuccess && data) {
            setProducts(data?.data?.result);
            setMeta(data?.data?.meta);
        }
    }, [data, isSuccess]);

    return (
        <div className="mb-12">
            <h4 className="text-lg lg:text-xl">Latest Books</h4>
            <ProductList products={products} />
            <Pagination meta={meta} setSearchParams={setSearchParams} />
        </div>
    );
};

export default ProductSection;
