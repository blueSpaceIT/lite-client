import { useEffect, useState } from "react";
import type { TArticle } from "../../../types";
import { articleService } from "../../../store/services/articleService";
import { useParams } from "react-router-dom";
import Container from "../../../components/common/Container/Container";
import Loader from "../../../components/common/Loader/Loader";
import moment from "moment";
import DOMPurify from "dompurify";

const ArticlesView = () => {
    const { articleID } = useParams();
    const [post, setPost] = useState<TArticle | null>(null);
    const { data, isSuccess } = articleService.useGetArticleQuery(articleID);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setPost(data.data);
        }
    }, [data, isSuccess]);

    return (
        <div className="pt-8 pb-5">
            <Container>
                {post ? (
                    <div>
                        <h3 className="text-lg lg:text-2xl mb-2">
                            {post.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs lg:text-sm mb-6">
                            <p>{post.author.name}</p>
                            <p>{moment(post.createdAt).format("LL")}</p>
                        </div>
                        <div className="h-[200px] md:h-[340px] lg:h-[470px] xl:h-[540px] overflow-hidden rounded-lg lg:rounded-xl">
                            <img
                                src={post.image}
                                alt=""
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        <div className="py-6">
                            <div
                                className="mb-5"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        post?.description || ""
                                    ),
                                }}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-10">
                        <Loader />
                    </div>
                )}
            </Container>
        </div>
    );
};

export default ArticlesView;
