import Marquee from "react-fast-marquee";
import bcsIcon from "/bcs__icon.png";
import { useEffect, useState } from "react";
import type { TMarquee } from "../../../../../types";
import { marqueeService } from "../../../../../store/services/marqueeService";

const MarqueeSection = () => {
    const [marquee, setMarquee] = useState<TMarquee | null>(null);
    const { data, isSuccess } = marqueeService.useGetMarqueeQuery("marquee");

    useEffect(() => {
        if (isSuccess && data?.data) {
            setMarquee(data.data);
        }
    }, [data, isSuccess]);

    return (
        <div className="bg-[#EAF0FF] my-3 py-2">
            <Marquee speed={100}>
                <div className="flex items-center gap-3">
                    {marquee &&
                        marquee.messages.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <p>{item}</p>
                                <img
                                    src={bcsIcon}
                                    alt=""
                                    className="w-5 lg:w-10"
                                />
                            </div>
                        ))}
                    <div></div>
                </div>
            </Marquee>
        </div>
    );
};

export default MarqueeSection;
