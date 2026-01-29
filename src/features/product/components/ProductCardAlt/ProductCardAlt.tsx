import { Link } from "react-router-dom";
import type { TProduct } from "../../../../types";

const ProductCardAlt = ({ product }: { product: TProduct }) => {
    return (
        <div className="flex gap-2">
            <div className="max-w-16 w-full grow-1">
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt="" className="w-full" />
                </Link>
            </div>
            <div>
                <Link to={`/product/${product.id}`}>
                    <p className="text-sm lg:text-base font-bold mb-1">
                        {product.name}
                    </p>
                </Link>
                <p className="text-xs lg:text-sm">
                    {product?.offerPrice && product.offerPrice > 0 ? (
                        <span className="line-through text-black/90">
                            {product.price}
                        </span>
                    ) : (
                        ""
                    )}{" "}
                    {product?.offerPrice && product.offerPrice > 0
                        ? product.offerPrice
                        : product.price}{" "}
                    টাকা
                </p>
            </div>
        </div>
    );
};

export default ProductCardAlt;
