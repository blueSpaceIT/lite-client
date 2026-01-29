const TitleCardOne = ({ text }: { text: string }) => {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-[#FFF5F5] font-siliguri text-center lg:text-lg border border-primary rounded-lg mb-5 px-2 py-2 lg:px-4 text-black">
                {text}
            </div>
        </div>
    );
};

export default TitleCardOne;
