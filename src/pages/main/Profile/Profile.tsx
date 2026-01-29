import Container from "../../../components/common/Container/Container";
import MainContent from "../../../components/layouts/MainContent";
import Sidebar from "../../../components/layouts/Sidebar";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import UploadProfile from "./components/UploadProfile/UploadProfile";

const Profile = () => {
    return (
        <div className="py-6 md:py-10 bg-gradient-to-r from-[#090913] to-[#0d0d15] text-white">
            <Container>
                <div className="grid md:grid-cols-8 lg:grid-cols-12 gap-5">
                    <Sidebar />

                    <MainContent>
                        <div className="grid gap-6">
                            <UploadProfile />
                            <UpdateProfile />
                            <ChangePassword />
                        </div>
                    </MainContent>
                </div>
            </Container>
        </div>
    );
};

export default Profile;
