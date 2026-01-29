import { useEffect, useState } from "react";
import Container from "../../../components/common/Container/Container";
import TitleCardOne from "../../../components/common/TitleCardOne/TitleCardOne";
import { adminService } from "../../../store/services/adminService";
import type { TAdmin } from "../../../types";
import profileImg from "/profile.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./TeamOditi.css";

const TeamCard = ({ item }: { item: TAdmin }) => {
    return (
        <div className="border border-black/20 rounded-2xl bg-white p-4 lg:p-6">
            <div className="flex justify-center">
                <div className="size-16 rounded-full overflow-hidden mb-3">
                    <img
                        src={item?.image || profileImg}
                        alt=""
                        className="size-xl object-center object-cover"
                    />
                </div>
            </div>
            <div>
                <h4 className="text-lg lg:text-xl text-center font-bold mb-1.5">
                    {item.name}
                </h4>

                <p className="text-sm lg:text-lg text-center text-slate-600">
                    {item.designation}
                </p>

                <p className="text-xs lg:text-sm">{item?.quote || ""}</p>
            </div>
        </div>
    );
};

const TeamOditi = () => {
    const [team, setTeams] = useState<TAdmin[]>([]);
    const { data, isSuccess } = adminService.useGetTeamsQuery([
        ["status", "Active"],
        ["limit", "100"],
    ]);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setTeams(data.data);
        }
    }, [data, isSuccess]);

    return (
        <div className="bg-[#F5FFF9] my-8 py-10">
            <Container>
                <TitleCardOne text="টিম অদিতি" />

                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    navigation
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="mySwiper relative"
                >
                    {team.map((item) => (
                        <SwiperSlide key={item._id}>
                            <TeamCard item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </div>
    );
};

export default TeamOditi;
