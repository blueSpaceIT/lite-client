const TitleCardTwo = ({ text, color }: { text: string; color?: string }) => {
    return (
        <div className="relative flex justify-center items-center py-6 mb-8 group">
            {/* Background horizontal line */}
            <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            {/* Pill-shaped title container */}
            <div className="relative bg-gradient-to-r from-[#0d0d15] via-[#1a2e24] to-[#0d0d15] border border-primary/40 rounded-full px-6 py-2.5 lg:px-10 shadow-[0_0_20px_rgba(32,178,87,0.2)] backdrop-blur-md transform transition-all duration-300 hover:scale-[1.02]">
                <h2 className={`font-siliguri text-lg lg:text-xl font-bold tracking-wider flex items-center gap-2 ${color ? `text-${color}` : "text-white"}`}>
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    {text}
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                </h2>
            </div>
        </div>
    );
};

export default TitleCardTwo;
