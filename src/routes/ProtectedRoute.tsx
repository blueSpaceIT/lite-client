import type { ReactNode } from "react";
import type { TUserRole } from "../types";
import { useAppSelector } from "../store/hook";
import { useCurrentUser } from "../store/slices/authSlice";
import { Navigate } from "react-router-dom";

type Props = {
    userRoles: TUserRole[];
    children: ReactNode;
};

const ProtectedRoute = ({ userRoles, children }: Props) => {
    const user = useAppSelector(useCurrentUser);

    if (!user || !userRoles.includes(user?.role)) {
        return <Navigate to={"/auth/login"} replace />;
    }

    return children;
};

export default ProtectedRoute;
