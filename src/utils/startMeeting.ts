// import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

const startMeeting = async (
    signature: string,
    payload: {
        meetingNumber: string;
        password: string;
        userName: string;
        leaveUrl: string;
    }
) => {
    console.log(signature, payload);
    // const client = ZoomMtgEmbedded.createClient();

    // const meetingSDKElement = document.getElementById("meetingSDKElement")!;
    // try {
    //     await client.init({
    //         zoomAppRoot: meetingSDKElement,
    //         language: "en-US",
    //         patchJsMedia: true,
    //         leaveOnPageUnload: true,
    //     });
    //     await client.join({
    //         signature: signature,
    //         meetingNumber: payload.meetingNumber,
    //         password: payload.password,
    //         userName: payload.userName,
    //         userEmail: "",
    //         tk: "",
    //         zak: "",
    //     });
    //     console.log("joined successfully");
    // } catch (error) {
    //     console.log(error);
    // }
};

export default startMeeting;
