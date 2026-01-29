import type { TProduct } from "../../../../types";
import ProductCardAlt from "../ProductCardAlt/ProductCardAlt";

const ProductList = ({ products }: { products: TProduct[] }) => {
    return (
        <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 py-4">
                {products.map((product) => (
                    <ProductCardAlt key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
