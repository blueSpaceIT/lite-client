import { IoBookOutline, IoSearchOutline } from "react-icons/io5";
import Container from "../../../components/common/Container/Container";
import { RiLeafLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import type { ReactNode } from "react";

const motiveData = [
    {
        icon: <IoSearchOutline />,
        title: "গবেষণা ও উন্নয়ন",
        description:
            "বিভিন্ন চাকরির পরীক্ষার প্রশ্ন প্যাটার্ন,সিলেবাস ইত্যাদি অ্যানালাইসিস করে প্রশ্নের ব্যাখ্যা,লেকচার শিট প্রণয়ন,আপডেট তথ্য ও নতুন কৌশল সংযোজন,সাজেশন তৈরি,ডাইজেস্ট ইত্যাদি প্রণয়নের মাধ্যমে শিক্ষার্থীদের চাকরি প্রস্তুতিকে ত্বরান্বিত করা।",
    },
    {
        icon: <FaRegUser />,
        title: "পেশাগত দক্ষতা অর্জন",
        description:
            "শুধু চাকরির পরীক্ষার প্রস্তুতি নয় বরং বিভিন্ন প্রফেশনাল স্কিল (যেমন: ভিডিও এডিটিং,কম্পিউটারের বেসিক দক্ষতা, ডিজিটাল মার্কেটিং ইত্যাদি) ডেভেলপমেন্টের মাধ্যমে তরুন প্রজন্মকে বেকারত্বের হাত থেকে মুক্ত করা।",
    },
    {
        icon: <IoBookOutline />,
        title: "চাকরির প্রস্তুতি সহজতর করা",
        description:
            "একদল দক্ষ মেন্টর কর্তৃক চাকরি প্রার্থীদের সঠিক এবং কার্যকরী গাইডলাইন প্রদান করা হয় যাতে চাকরি প্রার্থীরা সঠিক প্রস্তুতির মাধ্যমে সরকারি বা বেসরকারি চাকরির পরীক্ষায় সফল হতে পারে।",
    },
    {
        icon: <RiLeafLine />,
        title: "পরীক্ষার পূর্ববর্তী প্রস্তুতি",
        description:
            "অ্যাসাইনমেন্ট টেস্ট, সাবজেক্টিভ টেস্ট, মান্থলি টেস্ট, উইকলি টেস্ট,রিসেন্ট টেস্ট,সাজেশনমূলক ক্লাস এবং মডেল টেস্ট আয়োজনের মাধ্যমে শিক্ষার্থীদের বাস্তব পরীক্ষার জন্য পুরোপুরি প্রস্তুত করে তোলা।",
    },
];

const MotiveCard = ({
    item,
}: {
    item: { icon: ReactNode; title: string; description: string };
}) => {
    return (
        <div className="bg-gradient-to-br from-[#770002] to-[#D70000] text-white rounded-xl p-5">
            <div className="size-8 bg-[#FFF5F5] text-primary text-base flex justify-center items-center rounded mb-3">
                {item.icon}
            </div>
            <div className="text-lg lg:text-2xl font-bold mb-2">
                {item.title}
            </div>
            <div className="text-sm lg:text-base leading-6">
                {item.description}
            </div>
        </div>
    );
};

const WhyOditi = () => {
    return (
        <div className="py-5">
            <Container>
                <div className="flex justify-center items-center mb-5">
                    <div className="lg:text-2xl border-2 border-primary rounded-xl font-siliguri px-4 py-2">
                        কেন আমাদের পছন্দ করবেন?
                    </div>
                </div>

                <img src="/why-oditi.png" alt="" className="mb-5" />

                <div className="flex justify-center items-center mb-5">
                    <div className="lg:text-2xl border-2 border-primary rounded-xl font-siliguri px-4 py-2">
                        আমাদের মোটিভ
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {motiveData.map((item) => (
                        <MotiveCard item={item} />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default WhyOditi;
