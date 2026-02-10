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
  // If it's a relative video path (starts with /uploads), prepend your server URL
  const isExternalVideo = videoID.startsWith("/uploads");
  const videoSrc: PlyrSource = isExternalVideo
    ? {
        type: "video",
        sources: [
          {
            src: `https://api.liteedu.com${videoID}`, 
            type: "video/mp4",
          },
        ],
        poster: posterPic,
      }
    : {
        type: "video",
        sources: [
          {
            src: videoID, // YouTube URL
            provider: "youtube",
          },
        ],
        poster: posterPic,
      };

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
