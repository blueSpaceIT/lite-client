const TitleCardTwo = ({ text, color }: { text: string, color?: string }) => {
    return (
        <div className="flex justify-center items-center">
            <div className={`font-siliguri text-center lg:text-lg border-b border-primary rounded-lg mb-5 px-2 py-2 lg:px-4 text-${color}`}>
                {text}
            </div>
        </div>
    );
};

export default TitleCardTwo;
