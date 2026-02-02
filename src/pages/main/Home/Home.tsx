import BannerSection from "./components/BannerSection/BannerSection";
import CategorySection from "./components/CategorySection/CategorySection";
import CourseSection from "./components/CourseSection/CourseSection";
import FamilySection from "./components/FamilySection/FamilySection";
import PlatformInfoSection from "./components/PlatformInfoSection/PlatformInfoSection";
import ReviewSection from "./components/ReviewSection/ReviewSection";
import VideoSection from "./components/VideoSection/VideoSection";

const Home = () => {
    return (
        <div className="pt-2 pb-5 bg-gradient-to-r from-[#090913]  to-[#0d0d15]">
            <BannerSection bannerID="slider" />
            {/* <MarqueeSection /> */}
            <CategorySection />
            <CourseSection />
            <FamilySection />
            <ReviewSection />
            {/* <GallerySection /> */}
            <VideoSection />

            <PlatformInfoSection />
        </div>
    );
};

export default Home;
