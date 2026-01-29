const VideoSection = () => {
  return (
    <div className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-4">
          What’s included in the Online Batch?
        </h1>

        <p className="text-center text-sm lg:text-lg text-gray-400 mb-10">
          Get full preparation from anywhere in the country with top teachers’
          guidance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Video 1 */}
          <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/10">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/oN3UBRiRf_k"
                title="Online Batch Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">
                What’s included in the Online Batch all year?
              </h3>
              <p className="text-sm text-gray-400">
                Get full-year guidance with 400+ classes, notes, PDFs, and top
                teachers’ mentorship for 5th–10th grade students!
              </p>
            </div>
          </div>

          {/* Video 2 */}
          <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/10">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/QgzQpzpf-6Y"
                title="Best Result All Year"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">
                Achieve the Best Result All Year!
              </h3>
              <p className="text-sm text-gray-400">
                Follow the complete year-long routine and stay prepared for all
                exams throughout the academic year.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-200 flex items-center gap-2">
            Choose Your Class
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
