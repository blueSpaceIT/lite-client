import ArticleCategories from "./components/ArticleCategories/ArticleCategories";
import ArticlesList from "./components/ArticlesList/ArticlesList";
import FeaturedPost from "./components/FeaturedPost/FeaturedPost";

const Articles = () => {
    return (
        <div className="pt-8 pb-5 bg-gradient-to-r from-[#090913] to-[#0d0d15]">
            <FeaturedPost />
            <ArticleCategories />
            <ArticlesList />
        </div>
    );
};

export default Articles;
