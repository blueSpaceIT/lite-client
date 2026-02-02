import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./BannerSection.css";

import Container from "../../../../../components/common/Container/Container";
import { useEffect, useState } from "react";
import type { TSlider } from "../../../../../types";
import { sliderService } from "../../../../../store/services/sliderService";
import { Link } from "react-router-dom";

const BannerSection = ({ bannerID }: { bannerID: string }) => {
  const [slider, setSlider] = useState<TSlider | null>(null);

  const { data, isSuccess } = sliderService.useGetSliderQuery(bannerID);

  useEffect(() => {
    if (isSuccess && data?.data?.result) {
      setSlider(data.data);
    }
  }, [data, isSuccess]);

  return (
    <div className="mb-8 lg:my-8 banner">
      {slider && slider.result.length > 0 && (
        <Container>
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{
              el: ".custom-pagination",
              clickable: true,
            }}
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            slidesPerView={1}
          >
            {slider.result.map((item) => (
              <SwiperSlide key={item._id}>
                <Link to={item.destination}>
                  <div className="rounded-xl lg:rounded-2xl overflow-hidden">
                    <img
                      src={item.url}
                      alt="Banner"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-pagination flex justify-center mt-4" />
        </Container>
      )}
    </div>
  );
};

export default BannerSection;
