import type { TAdmin } from "../../../../../types";

const TeamUserCard = ({ user }: { user: TAdmin }) => {
    return (
        <div className="border border-[#20b257]/50 rounded-2xl lg:rounded-3xl p-5 lg:p-6 bg-white">
            <div className="flex justify-center items-center mb-3">
                <div className="size-12 lg:size-16 rounded-xl overflow-hidden">
                    <img
                        src={user?.image || "/profile.png"}
                        alt=""
                        className="size-full object-center object-cover"
                    />
                </div>
            </div>
            <div className="text-center">
                <h4 className="font-semibold text-sm md:text-xl">
                    {user.name}
                </h4>
                <p className="text-black/60 text-xs md:text-lg">
                    {user?.designation}
                </p>
            </div>
        </div>
    );
};

export default TeamUserCard;
