import MainLayout from "../components/layouts/MainLayout";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import ResetPassword from "../pages/auth/ResetPassword/ResetPassword";

export const authRoutes = [
    {
        path: "/auth",
        element: <MainLayout />,
        children: [
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "reset-password",
                element: <ResetPassword />,
            },
        ],
    },
];
