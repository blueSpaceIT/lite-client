import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TProduct } from "../../../types";
import { productService } from "../../../store/services/productService";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import {
    addItem,
    useCurrentCart,
    type TCartItem,
} from "../../../store/slices/cartSlice";
import Loader from "../../../components/common/Loader/Loader";
import { Button } from "@headlessui/react";
import { Radio } from "antd";
import toast from "react-hot-toast";
import ContainerSM from "../../../components/common/Container/ContainerSM";
import ProductShortPDFModal from "./components/ProductShortPDFModal/ProductShortPDFModal";
import Container from "../../../components/common/Container/Container";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";

type TCartState = {
    loading: boolean;
    cartType: "hardcopy" | "ebook";
    cartOptions: { value: string; label: string; disabled?: boolean }[];
};

const ProductTypeSelection = ({
    product,
    cart,
    cartState,
    setCartState,
}: {
    product: TProduct;
    cart: TCartItem[];
    cartState: TCartState;
    setCartState: React.Dispatch<React.SetStateAction<TCartState>>;
}) => {
    useEffect(() => {
        const newOptions: {
            value: string;
            label: string;
            disabled?: boolean;
        }[] = [];

        if (product?.stock === "In stock") {
            newOptions.push({
                value: "hardcopy",
                label: "পেপার-বুক",
                disabled: cart.length > 0 ? cart[0].type !== "hardcopy" : false,
            });
        }

        if (product?.fullPDF) {
            newOptions.push({
                value: "ebook",
                label: "ই-বুক",
                disabled: cart.length > 0 ? cart[0].type !== "ebook" : false,
            });
        }

        setCartState((prev) => ({
            ...prev,
            cartOptions: newOptions,
        }));
    }, [product, cart, setCartState]);

    const changeCartStateTypeHandler = (data: "hardcopy" | "ebook") => {
        setCartState((prev) => ({
            ...prev,
            cartType: data,
        }));
    };
    return (
        <div className="mb-6">
            <Radio.Group
                options={cartState.cartOptions}
                value={cartState.cartType}
                onChange={(e) => changeCartStateTypeHandler(e.target.value)}
            />
        </div>
    );
};

const Product = () => {
    const navigate = useNavigate();
    const { productID } = useParams();
    const [product, setProduct] = useState<TProduct | null>(null);
    const dispatch = useAppDispatch();
    const cart = useAppSelector(useCurrentCart);
    const [cartState, setCartState] = useState<TCartState>({
        loading: false,
        cartType: cart.length > 0 ? cart[0].type : "hardcopy",
        cartOptions: [],
    });

    const addToCartHandler = (product: TProduct, redirect: boolean) => {
        setCartState((prev) => ({
            ...prev,
            loading: true,
        }));

        if (cart.length > 0) {
            if (cart[0].type !== cartState.cartType) {
                setCartState((prev) => ({
                    ...prev,
                    loading: false,
                }));
                return toast.error(
                    "You cannot add Hardbook and Ebook in same time"
                );
            }
        }

        dispatch(
            addItem({
                product: product.id,
                name: product.name,
                image: product.image,
                price:
                    product?.offerPrice && product.offerPrice > 0
                        ? product.offerPrice
                        : product.price,
                quantity: 1,
                type: cartState.cartType,
            })
        );
        toast.success("Added successfully");
        setCartState((prev) => ({
            ...prev,
            loading: false,
        }));

        if (redirect) {
            navigate("/checkout", { replace: true });
        }
    };

    const { data, isSuccess } = productService.useGetProductQuery(productID);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setProduct(data.data);
        }
    }, [data, isSuccess]);

    return (
        <div>
            {product ? (
                <div>
                    <div className="bg-[#F5FFF9] py-8 my-6">
                        <ContainerSM>
                            <div className="grid md:grid-cols-2 gap-5 lg:gap-8">
                                <div>
                                    <div className="rounded-lg overflow-hidden mb-5">
                                        <img
                                            src={product.image}
                                            alt=""
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="flex justify-end items-center">
                                        {product?.shortPDF && (
                                            <ProductShortPDFModal
                                                pdfUrl={product.shortPDF}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg lg:text-2xl font-semibold mb-3">
                                        {product.name}
                                    </h3>
                                    <p className="lg:text-lg mb-2">
                                        {product?.offerPrice &&
                                        product.offerPrice > 0 ? (
                                            <span className="line-through text-black/90">
                                                {product.price}
                                            </span>
                                        ) : (
                                            ""
                                        )}{" "}
                                        {product?.offerPrice &&
                                        product.offerPrice > 0
                                            ? product.offerPrice
                                            : product.price}{" "}
                                        BDT
                                    </p>

                                    <div>
                                        <div className="mb-5">
                                            <p className="text-slate-600 mb-1">
                                                Choose
                                            </p>

                                            <ProductTypeSelection
                                                product={product}
                                                cart={cart}
                                                cartState={cartState}
                                                setCartState={setCartState}
                                            />

                                            {product.stock === "In stock" ||
                                            product?.fullPDF ? (
                                                <div className="flex justify-start items-center gap-3">
                                                    <Button
                                                        onClick={() =>
                                                            addToCartHandler(
                                                                product,
                                                                true
                                                            )
                                                        }
                                                        className={`text-sm text-white bg-primary border border-primary rounded-lg px-4 py-2 cursor-pointer ${
                                                            cartState.loading
                                                                ? "disabled muted"
                                                                : ""
                                                        }`}
                                                    >
                                                        {cartState.loading
                                                            ? "Loading..."
                                                            : "Buy Now"}
                                                    </Button>

                                                    <Button
                                                        onClick={() =>
                                                            addToCartHandler(
                                                                product,
                                                                false
                                                            )
                                                        }
                                                        className={`text-sm text-primary bg-white border border-primary rounded-lg px-4 py-2 cursor-pointer ${
                                                            cartState.loading
                                                                ? "disabled muted"
                                                                : ""
                                                        }`}
                                                    >
                                                        {cartState.loading
                                                            ? "Loading..."
                                                            : "Add to Cart"}
                                                    </Button>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                        <div>
                                            <p className="lg:text-lg mb-3">
                                                Details
                                            </p>

                                            <div className="grid gap-2">
                                                {product.description.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex justify-between items-center gap-2 text-xs lg:text-sm"
                                                        >
                                                            <p className="font-semibold">
                                                                {item.key}
                                                            </p>
                                                            <p className="text-right">
                                                                {item.value}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ContainerSM>
                    </div>
                    <div className="py-5">
                        <Container>
                            <RelatedProducts
                                categoryID={product.category._id}
                            />
                        </Container>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center py-10">
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default Product;
