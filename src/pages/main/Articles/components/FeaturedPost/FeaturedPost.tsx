import { useEffect, useState } from "react";
import type { TArticle } from "../../../../../types";
import { articleService } from "../../../../../store/services/articleService";
import Container from "../../../../../components/common/Container/Container";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";

const FeaturedPost = () => {
    const [post, setPost] = useState<TArticle | null>(null);
    const { data, isSuccess } = articleService.useGetArticlesQuery([
        ["featured", true],
        ["limit", 1],
    ]);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setPost(data.data.result?.[0]);
        }
    }, [data, isSuccess]);

    return (
        <div className="py-1 lg:py-3 bg-gradient-to-r from-[#090913] to-[#0d0d15]">
            <div className="py-6 md:py-10 md:px-10">
                <Container>
                    {post && (
                        <div className="flex flex-col md:flex-row-reverse justify-center items-center md:justify-between gap-2 md:gap-3">
                            <div className="max-w-[250px] lg:max-w-[420px] w-full rounded-lg overflow-hidden">
                                <img src={post.image} alt="" />
                            </div>

                            <div className="max-w-[250px] lg:max-w-[550px] w-full text-white">
                                <h4 className="text-sm lg:text-3xl mb-2 lg:mb-3 font-bold">
                                    ফিচার পোস্ট
                                </h4>
                                <Link to={`/article/${post.id}`}>
                                    <p className="text-xs lg:text-2xl mb-1 lg:mb-2">
                                        {post.name}
                                    </p>
                                </Link>
                                <p className="text-[10px] lg:text-base mb-1">
                                    লেখক - <span>{post.author.name}</span>
                                </p>
                                <Link to={`/article/${post.id}`}>
                                    <Button
                                        className={
                                            "text-xs text-white bg-primary rounded-lg p-2 cursor-pointer"
                                        }
                                    >
                                        আরো পড়ুন
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default FeaturedPost;
