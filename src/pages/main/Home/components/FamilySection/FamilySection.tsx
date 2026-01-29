import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import Container from "../../../../../components/common/Container/Container";
import LinkBtn from "../../../../../components/common/LinkBtn/LinkBtn";
import TitleCardOne from "../../../../../components/common/TitleCardOne/TitleCardOne";
import { adminService } from "../../../../../store/services/adminService";
import type { TAdmin } from "../../../../../types";
import "./FamilySection.css";
import TeamUserCard from "./TeamUserCard";

// const TeamCard = ({ item }: { item: TAdmin }) => {
//     return (
//         <div className="border border-black/20 rounded-2xl bg-white p-4 lg:p-6">
//             <div className="flex justify-center">
//                 <div className="size-16 rounded-full overflow-hidden mb-3">
//                     <img
//                         src={item?.image || profileImg}
//                         alt=""
//                         className="size-xl object-center object-cover"
//                     />
//                 </div>
//             </div>
//             <div>
//                 <h4 className="text-lg lg:text-xl text-center font-bold mb-1.5">
//                     {item.name}
//                 </h4>

//                 <p className="text-sm lg:text-lg text-center text-slate-600">
//                     {item.designation}
//                 </p>

//                 <p className="text-xs lg:text-sm">{item?.quote || ""}</p>
//             </div>
//         </div>
//     );
// };

const FamilySection = () => {
    const [team, setTeam] = useState<TAdmin[]>([]);
    const { data, isSuccess } = adminService.useGetTeamsQuery([
        ["status", "Active"],
        ["limit", "20"],
    ]);

    useEffect(() => {
        if (isSuccess && data) {
            setTeam(data?.data);
        }
    }, [data, isSuccess]);

    return (
        <div className="bg-gradient-to-r from-[#090913]  to-[#0d0d15] py-10">
            <Container>
                <TitleCardOne text="Team " />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8 xl:gap-10 mt-4 mb-6">
                    {team.slice(0, 8).map((item) => (
                        <TeamUserCard key={item._id} user={item} />
                    ))}
                </div>

                <div className="mb-6 mt-4">
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
                        {/* {team.map((item) => (
                            <SwiperSlide key={item._id}>
                                <TeamCard item={item} />
                            </SwiperSlide>
                        ))} */}
                    </Swiper>
                </div>

                <LinkBtn to="/team" text="See More" />
            </Container>
        </div>
    );
};

export default FamilySection;
