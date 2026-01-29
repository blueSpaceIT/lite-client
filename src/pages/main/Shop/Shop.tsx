import Container from "../../../components/common/Container/Container";
import TitleCardOne from "../../../components/common/TitleCardOne/TitleCardOne";
import BannerSection from "../Home/components/BannerSection/BannerSection";
import BestSellingProductSection from "./components/BestSellingProductSection/BestSellingProductSection";
import PopularProductSection from "./components/PopularProductSection/PopularProductSection";
import ProductCategorySection from "./components/ProductCategorySection/ProductCategorySection";
import ProductSection from "./components/ProductSection/ProductSection";

const Shop = () => {
    return (
        <div className="pt-2 pb-5 bg-gradient-to-r from-[#090913] to-[#0d0d15]">
            <BannerSection bannerID="book-slider" />
            <ProductCategorySection />

            <div className="py-6 my-5 text-white">
                <Container>
                    <TitleCardOne text="Books" />
                    <PopularProductSection />
                    <BestSellingProductSection />
                    <ProductSection />
                </Container>
            </div>
        </div>
    );
};

export default Shop;
