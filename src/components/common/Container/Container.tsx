import type { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className="max-w-[1240px] xl:w-full mx-5 xl:mx-auto">
            {children}
        </div>
    );
};

export default Container;
