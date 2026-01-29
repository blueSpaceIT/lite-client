import { useEffect, useState } from "react";
import type { TProduct } from "../../../../../types";
import ProductList from "../../../../../features/product/components/ProductList/ProductList";
import { productService } from "../../../../../store/services/productService";

const RelatedProducts = ({ categoryID }: { categoryID: string }) => {
    const [products, setProducts] = useState<TProduct[]>([]);

    const { data, isSuccess } = productService.useGetProductsQuery([
        ["category", categoryID],
        ["limit", "4"],
    ]);

    useEffect(() => {
        if (isSuccess && data) {
            setProducts(data?.data?.result);
        }
    }, [data, isSuccess]);

    return (
        <div className="mb-12">
            <h4 className="text-lg lg:text-xl">একইরকম বই</h4>
            <ProductList products={products} />
        </div>
    );
};

export default RelatedProducts;
