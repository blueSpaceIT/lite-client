import Container from "../../../../../components/common/Container/Container";

const Banner = () => {
    return (
        <div className="py-1 lg:py-3">
            <div className="bg-gradient-to-r from-[#000098] to-[#9D0003] py-6 md:py-24">
                <Container>
                    <div className="flex justify-center items-center text-white">
                        <div>
                            <h4 className="text-lg lg:text-3xl mb-1.5">
                                আজকের নিউজগুলো
                            </h4>
                            <p className="text-sm lg:text-lg">
                                গুরুত্বপূর্ণ নিউজগুলোতে চোখ বুলিয়ে নিন একনজরে
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Banner;
