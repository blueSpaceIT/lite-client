import { useEffect, useState } from "react";
import ContainerSM from "../../../../../components/common/Container/ContainerSM";
import TitleCardTwo from "../../../../../components/common/TitleCardTwo/TitleCardTwo";
import type { TArticle, TMeta } from "../../../../../types";
import { articleService } from "../../../../../store/services/articleService";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../../../../components/common/Pagination/Pagination";

const ArticleCard = ({ article }: { article: TArticle }) => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 lg:gap-7">
            <Link to={`/article/${article.id}`}>
                <div className="w-1/2 md:w-full flex rounded-lg overflow-hidden">
                    <img src={article.image} alt="" />
                </div>
            </Link>
            <div>
                <Link to={`/articles?category=${article.category._id}`}>
                    <p className="text-xs lg:text-sm md:mb-3.5">
                        {article.category.name}
                    </p>
                </Link>
                <Link to={`/article/${article.id}`}>
                    <h4 className="text-lg lg:text-2xl mb-1.5 md:mb-2.5">
                        {article.name}
                    </h4>
                </Link>

                <p className="text-xs lg:text-sm">
                    {article.description
                        ?.slice(3)
                        ?.split(" ")
                        ?.slice(0, 10)
                        ?.join(" ") +
                        (article.description?.split(" ").length > 10
                            ? "..."
                            : "")}
                </p>
            </div>
        </div>
    );
};

const ArticlesList = () => {
    const [posts, setPosts] = useState<TArticle[]>([]);
    const [meta, setMeta] = useState<TMeta>({
        page: 1,
        limit: 10,
        totalPage: 1,
        totalDoc: 0,
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isSuccess } = articleService.useGetArticlesQuery(
        searchParams ? [...searchParams] : undefined
    );

    useEffect(() => {
        if (isSuccess && data?.data) {
            setPosts(data.data.result);
            setMeta(data.data.meta);
        }
    }, [data, isSuccess]);

    return (
        <div className="py-6 bg-gradient-to-r from-[#090913] to-[#0d0d15] text-white">
            <ContainerSM>
                <TitleCardTwo text="Career related blogging" />

                <div className="grid gap-5 mb-8">
                    {posts.map((item) => (
                        <ArticleCard key={item._id} article={item} />
                    ))}
                </div>

                <Pagination meta={meta} setSearchParams={setSearchParams} />
            </ContainerSM>
        </div>
    );
};

export default ArticlesList;
