import { Button } from "@headlessui/react";
import type { TProduct } from "../../../../types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: TProduct }) => {
    return (
        <div className="relative bg-white border border-slate-400 p-3 lg:p-4 rounded-xl">
            <div className="overflow-hidden mb-2">
                <img src={product.image} alt="" />
            </div>
            <div className="text-center">
                <Link to={`/product/${product.id}`}>
                    <h4 className="text-sm lg:text-base font-semibold mb-2">
                        {product.name}
                    </h4>
                </Link>
                <p className="mb-1">
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
                    BDT
                </p>
                <div className="flex justify-center">
                    <Link to={`/product/${product.id}`}>
                        <Button
                            className={
                                "text-xs text-white bg-primary rounded-lg p-2 cursor-pointer"
                            }
                        >
                            Order now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
