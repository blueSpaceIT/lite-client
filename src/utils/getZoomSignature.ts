const getZoomSignature = async (
    token: string,
    payload: {
        meetingNumber: string;
        expirationSeconds?: number;
    }
) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/zoom`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
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

export default getZoomSignature;
