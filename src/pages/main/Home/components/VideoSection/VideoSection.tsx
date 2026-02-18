import { useGetHomeVideoSectionsQuery } from "@/store/services/homeVideoSectionService";

const VideoSection = () => {
  const { data: response, isLoading } = useGetHomeVideoSectionsQuery(undefined);

  if (isLoading) {
    return (
      <div className="bg-black text-white py-12 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const section = response?.data?.[0];

  if (!section) return null;

  // Helper to convert watch URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "youtube.com/embed/");
    }
    return url;
  };

  return (
    <div className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-4">
          {section.title}
        </h1>

        <p className="text-center text-sm lg:text-lg text-gray-400 mb-10">
          {section.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {section.videos.map((video: any) => (
            <div
              key={video._id}
              className="bg-[#111] rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={getEmbedUrl(video.videoUrl)}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {section.ctaButtonLabel && (
          <div className="flex justify-center mt-12">
            <a
              href={section.ctaButtonLink}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 flex items-center gap-2"
            >
              {section.ctaButtonLabel}
              <span className="text-lg">→</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
