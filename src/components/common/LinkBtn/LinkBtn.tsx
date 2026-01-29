import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";

const LinkBtn = ({ text, to }: { text: string; to: string }) => {
    return (
        <div className="flex justify-center items-center">
            <Link to={to}>
                <Button className="rounded bg-primary text-white text-[10px] md:text-xs lg:text-lg px-1.5 py-1 md:px-2.5 md:py-2 lg:px-4 lg:py-2.5 cursor-pointer">
                    {text}
                </Button>
            </Link>
        </div>
    );
};

export default LinkBtn;
