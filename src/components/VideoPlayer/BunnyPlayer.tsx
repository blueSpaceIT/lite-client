const BunnyPlayer = ({ videoID }: { videoID: string }) => {
    return (
        <div
            className="mb_75"
            style={{ position: "relative", paddingTop: "56.25%" }}
        >
            <iframe
                src={`https://iframe.mediadelivery.net/embed/563324/${videoID}?autoplay=true&loop=false&muted=false&preload=true&responsive=true`}
                loading="lazy"
                style={{
                    border: 0,
                    position: "absolute",
                    top: 0,
                    height: "100%",
                    width: "100%",
                }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                referrerPolicy="origin"
                title="Video Player"
            />
        </div>
    );
};

export default BunnyPlayer;
