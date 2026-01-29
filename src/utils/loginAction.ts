import type { TAuth } from "../types";

const loginAction = async (payload: TAuth) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/auth/signin/student`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

export default loginAction;
