import Plyr, { type PlyrOptions, type PlyrSource } from "plyr-react";
import "plyr-react/plyr.css";
import "./VideoPlayer.css";

const VideoPlayer = ({
    videoID,
    posterPic,
}: {
    videoID: string;
    posterPic?: string;
}) => {
    const videoSrc: PlyrSource = {
        type: "video",
        sources: [
            {
                src: videoID,
                provider: "youtube",
            },
        ],
    };
    if (posterPic) {
        videoSrc.poster = posterPic;
    }

    const options: PlyrOptions = {
        youtube: {
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            fs: 0,
        },
    };

    return (
        <div className="w-full">
            <Plyr source={videoSrc} options={options} />
        </div>
    );
};

export default VideoPlayer;
