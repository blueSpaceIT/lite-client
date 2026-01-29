import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <div>
            <Header />

            <Toaster />

            <div>
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default MainLayout;
