import type { ReactNode } from "react";
import Container from "../../../../../components/common/Container/Container";
import groupImg from "../../../../../assets/images/info/group.png";
import adminImg from "../../../../../assets/images/info/human.png";
import coupleImg from "../../../../../assets/images/info/couple.png";
import branchImg from "../../../../../assets/images/info/branch.png";

const InfoCard = ({
    color,
    icon,
    text,
    count,
}: {
    color: string;
    icon: ReactNode;
    text: string;
    count: string;
}) => {
    return (
        <div
            className={`flex flex-col justify-center items-center rounded-xl px-3 py-8 lg:py-14 ${color}`}
        >
            {icon}
            <h5 className="font-medium text-lg lg:text-xl mb-2">{text}</h5>
            <h3 className="font-semibold text-xl lg:text-3xl">{count}+</h3>
        </div>
    );
};

const PlatformInfoSection = () => {
    return (
        <div className="bg-gradient-to-r from-[#090913]  to-[#0d0d15] py-8 my-5 text-white">
            <Container>
                <h2 className="text-xl lg:text-3xl font-medium text-center mb-3">
                    ODITI Career: A Trusted Platform for Job Seekers
                </h2>
                <p className="text-center text-sm lg:text-lg mb-8">
                    Service is our motto; success is its by-product
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:px-36">
                    <InfoCard
                        color="bg-[#FFDD9D]"
                        icon={
                            <img
                                src={groupImg}
                                alt="Group"
                                className="size-7 lg:size-8 mb-1"
                            />
                        }
                        text="Students"
                        count="1,20,000"
                    />
                    <InfoCard
                        color="bg-[#BEE6FF]"
                        icon={
                            <img
                                src={adminImg}
                                alt="Cadres"
                                className="size-7 lg:size-8 mb-1"
                            />
                        }
                        text="Cadres"
                        count="5000"
                    />
                    <InfoCard
                        color="bg-[#DAFFAD]/80"
                        icon={
                            <img
                                src={coupleImg}
                                alt="Non-Cadres"
                                className="size-7 lg:size-8 mb-1  "
                            />
                        }
                        text="Non-Cadres"
                        count="15,000"
                    />
                    <InfoCard
                        color="bg-[#D4C8FF]"
                        icon={
                            <img
                                src={branchImg}
                                alt="Branches"
                                className="size-7 lg:size-8 mb-1"
                            />
                        }
                        text="Branches"
                        count="10"
                    />
                </div>
            </Container>
        </div>
    );
};

export default PlatformInfoSection;
