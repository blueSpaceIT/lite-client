import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderService } from "../../../../../store/services/sliderService";
import type { TSlider } from "../../../../../types";
import "./BannerSection.css";

const BannerSection = ({ bannerID }: { bannerID: string }) => {
    const [slider, setSlider] = useState<TSlider | null>(null);
    const { data, isSuccess } = sliderService.useGetSliderQuery(bannerID);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setSlider(data.data);
        }
    }, [data, isSuccess]);

    return (
        <div className="banner-3d py-8 lg:py-12 overflow-hidden">
            {slider && (
                <div className="relative">
                    <Swiper
                        key={slider._id}
                        modules={[Autoplay, Pagination, EffectCoverflow]}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        loop={true}
                        slidesPerView={"auto"}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: true,
                        }}
                        pagination={{
                            el: ".custom-pagination-3d",
                            clickable: true,
                            renderBullet: (index, className) => {
                                // Only show bullets for the original number of images
                                if (index >= slider.images.length) return "";
                                return `<span class="${className}"></span>`;
                            },
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        observer={true}
                        observeParents={true}
                        watchSlidesProgress={true}
                        className="banner-3d-swiper"
                    >
                        {(slider.images.length > 0 && slider.images.length < 6
                            ? [...slider.images, ...slider.images, ...slider.images]
                            : slider.images
                        ).map((item, index) => (
                            <SwiperSlide key={`${item._id}-${index}`} className="banner-3d-slide">
                                <Link to={item.destination}>
                                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                                        <img
                                            src={item.url}
                                            alt=""
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="custom-pagination-3d flex justify-center mt-6"></div>
                </div>
            )}
        </div>
    );
};

export default BannerSection;
