import type { ReactNode } from "react";

const ContainerSM = ({ children }: { children: ReactNode }) => {
    return (
        <div className="max-w-[820px] lg:w-full mx-5 lg:mx-auto">
            {children}
        </div>
    );
};

export default ContainerSM;
