import { useEffect, useState } from "react";
import type { TProductCategory } from "../../../../../types";
import { productCategoryService } from "../../../../../store/services/productCategoryService";
import Container from "../../../../../components/common/Container/Container";
import { Button } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";

const ProductCategorySection = () => {
    const [categories, setCategories] = useState<TProductCategory[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, isSuccess } =
        productCategoryService.useGetProductCategoriesQuery([
            ["sort", "createdAt"],
        ]);

    useEffect(() => {
        if (isSuccess && data) {
            setCategories(data?.data?.result);
        }
    }, [data, isSuccess]);

    return (
        <Container>
            <div className="flex justify-center items-center gap-1.5 py-5 ">
                <div className="w-max flex gap-2 text-white">
                    <Button
                        key={1}
                        onClick={() => {
                            searchParams.delete("category");
                            setSearchParams(searchParams);
                        }}
                        className={`${
                            searchParams.get("category") === null
                                ? "text-white bg-primary border border-primary"
                                : "text-black border border-slate-400"
                        } text-center px-2.5 py-1 rounded-full cursor-pointer text-xs lg:text-sm`}
                    >
                        <span className="text-white">All</span>
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category._id}
                            onClick={() =>
                                setSearchParams({ category: category._id })
                            }
                            className={`${
                                searchParams.get("category") === category._id
                                    ? "text-white bg-primary border border-primary"
                                    : "text-white border border-slate-400"
                            } text-center px-2.5 py-1 rounded-full cursor-pointer text-xs lg:text-sm`}
                        >
                            <span>{category.name}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default ProductCategorySection;
