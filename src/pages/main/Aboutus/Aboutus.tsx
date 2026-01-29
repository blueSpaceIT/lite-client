import Container from "../../../components/common/Container/Container";

const Aboutus = () => {
    return (
        <div className="py-5">
            <div className="relative bg-gradient-to-r from-[#753A88] to-[#1D2671] py-5 lg:py-10">
                <div className="flex justify-center items-center">
                    <div className="text-white lg:text-2xl border-2 border-white rounded-xl font-siliguri px-4 py-2">
                        আমাদের সম্পর্কে
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="relative max-w-[350px] lg:max-w-[630px] w-full text-white lg:text-3xl lg:leading-12 text-center mx-4 py-8 mb-5 lg:mb-8">
                        <img
                            src="/light.png"
                            alt=""
                            className="absolute top-0 right-0"
                        />
                        প্রতিযোগিতামূলক চাকরি পরীক্ষার প্রস্তুতির জন্য দেশের
                        সর্বপ্রথম ও সর্ববৃহৎ অনলাইন প্লাটফর্ম "ওদিতি"
                    </div>
                </div>

                <img
                    src="/about-banner.png"
                    alt=""
                    className="absolute bottom-5 lg:bottom-8 left-5 lg:left-20"
                />
            </div>

            <Container>
                <div className="py-6">
                    <h4 className="text-center lg:text-2xl font-bold mb-6">
                        এক নজরে "ওদিতি"
                    </h4>

                    <div className="grid lg:grid-cols-2 gap-5 mb-10">
                        <div className="text-sm lg:text-2xl h-max grid gap-3 lg:gap-6 lg:leading-10">
                            <p>
                                লক্ষাধিক বেকার শিক্ষার্থী তাদের স্নাতক শেষ করেই
                                সরকারি-বেসরকারি চাকরির জন্য প্রস্তুতি নেয়া শুরু
                                করে। এক্ষেত্রে তারা গাইডলাইন বা পরামর্শের জন্য
                                চাকরির প্রস্তুতিতে সহায়তা করে এরকম বিভিন্ন
                                প্রতিষ্ঠানের শরণাপন্ন হয় এবং বহু অর্থ খরচ করে।
                                কিন্তু এই প্রতিষ্ঠানগুলোর অবস্থান মূলত ঢাকায়,
                                নয়তো দেশের বিভাগীয় শহর গুলোতে। দেশের প্রত্যন্ত
                                অঞ্চলের চাকরি প্রত্যাশীরা চাইলেও সরাসরি গিয়ে
                                সুবিধা নিতে পারেনা।
                            </p>
                            <p>
                                তাছাড়া এ সকল প্রতিষ্ঠানে অনেক বেশি কোর্স ফি
                                থাকে এবং পড়াশোনার মান যথার্থ না হওয়ায় চাকরি
                                প্রত্যাশীরা পরিপূর্ণ প্রস্তুতির অভাবে তাদের
                                কাঙ্ক্ষিত লক্ষ্যে পৌঁছাতে পারেন না। এতে সরকারি
                                চাকরির স্বপ্ন অনেক ক্ষেত্রে স্বপ্নই থেকে যায়।
                            </p>
                            <p>
                                এ সকল বিষয়গুলো চিন্তা করেই ক্যারিয়ার বিশেষজ্ঞ
                                ও বিসিএস ক্যাডার মাইদুল ইসলাম প্রধান যিনি সবার
                                কাছে এম আই প্রধান মুকুল স্যার হিসেবেই বিশেষ
                                পরিচিত, তিনি ২০১৯ সালের শেষের দিকে "বিদ্যাবাড়ি"
                                নামে চাকরি প্রস্তুতির জন্য একটি অনলাইন প্লাটফর্ম
                                প্রতিষ্ঠার উদ্যোগ গ্রহণ করেন।
                            </p>
                        </div>
                        <div>
                            <img src="/about-us.png" alt="" />
                        </div>
                    </div>

                    <div>
                        <h4 className="lg:text-2xl font-bold mb-3">
                            আমাদের লক্ষ্য
                        </h4>
                        <p className="text-sm lg:text-2xl lg:leading-10">
                            বিদ্যাবাড়ি প্রতিযোগিতামূলক চাকরির পরীক্ষার
                            প্রস্তুতির জন্য একটি অনন্য শিক্ষাপ্রতিষ্ঠান। যেখানে
                            শিক্ষার উন্নয়ন, গবেষণা এবং জ্ঞান বৃদ্ধির উদ্দেশ্যে
                            কাজ করা হয়। বিদ্যাবাড়ি চাকরি প্রার্থীদের কাঙ্ক্ষিত
                            সাফল্য অর্জনের জন্য আপ্রাণ চেষ্টা চালিয়ে যাচ্ছে।
                            কারন, চাকরি প্রার্থীদের সাফল্য মানেই বিদ্যাবাড়ির
                            সাফল্য। প্রকৃতপক্ষে, বিদ্যাবাড়ির লক্ষ্য সাধারণভাবে
                            শিক্ষার মাধ্যমে সমাজের উন্নতি ঘটানো, প্রতিভার বিকাশ
                            এবং একটি উন্নত ও বৈষম্যহীন সমাজ প্রতিষ্ঠার জন্য কাজ
                            করা।
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Aboutus;
