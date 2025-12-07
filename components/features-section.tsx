"use client"

export function FeaturesSection() {
  return (
    <section className="section bg-[#0a1428]">
      <div className="container">
        <h2 className="text-4xl font-bold text-white text-center mb-12">We made crypto trading easy</h2>

        {/* Video Section */}
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-12 relative min-h-[500px]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/media/2nd section video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">500k+</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">180k+</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">0</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">153</div>
          </div>
        </div>
      </div>
    </section>
  )
}
