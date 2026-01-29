import type { ReactNode } from "react";

const MainContent = ({ children }: { children: ReactNode }) => {
    return <div className="md:col-span-6 lg:col-span-10 h-max">{children}</div>;
};

export default MainContent;
