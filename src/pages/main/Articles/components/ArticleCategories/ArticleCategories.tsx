import { useEffect, useState } from "react";
import type { TArticleCategory } from "../../../../../types";
import { articleCategoryService } from "../../../../../store/services/articleCategoryService";
import ContainerSM from "../../../../../components/common/Container/ContainerSM";
import TitleCardTwo from "../../../../../components/common/TitleCardTwo/TitleCardTwo";
import { Link, useSearchParams } from "react-router-dom";

const CategoryCard = ({ category }: { category: TArticleCategory }) => {
    const [searchParams] = useSearchParams();
    const categoryID = searchParams.get("category") || "";

    return (
        <Link to={`/articles?category=${category._id}`}>
            <div
                className={`${
                    categoryID === category._id ? "bg-primary" : ""
                } border border-primary p-4 md:p-6 rounded-xl lg:rounded-2xl`}
            >
                <div className="size-10 flex justify-center items-center bg-primary mb-2.5 rounded-lg p-2">
                    <img src={category.image} alt="" />
                </div>
                <div
                    className={`${
                        categoryID === category._id ? "text-white" : ""
                    }`}
                >
                    <h4 className="text-base lg:text-xl mb-1.5">
                        {category.name}
                    </h4>
                    <p className="text-xs lg:text-sm">{category.description}</p>
                </div>
            </div>
        </Link>
    );
};

const ArticleCategories = () => {
    const [categories, setCategories] = useState<TArticleCategory[]>([]);
    const { data, isSuccess } =
        articleCategoryService.useGetArticleCategoriesQuery([
            ["sort", "createdAt"],
        ]);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setCategories(data.data.result);
        }
    }, [data, isSuccess]);

    return (
        <div className="py-6 bg-gradient-to-r from-[#090913] to-[#0d0d15] text-white">
            <ContainerSM>
                <TitleCardTwo text="All Categories" />

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                    {categories.map((item) => (
                        <CategoryCard key={item._id} category={item} />
                    ))}
                </div>
            </ContainerSM>
        </div>
    );
};

export default ArticleCategories;
