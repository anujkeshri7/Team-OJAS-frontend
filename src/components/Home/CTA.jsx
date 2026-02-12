import { ArrowRight, Zap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative bg-[#0B0F1A] py-36 overflow-hidden">

      {/* Background Glows */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-3xl" />

        <div className="absolute top-20 right-20
        w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-20 left-20
        w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2
        rounded-full border border-cyan-400/30
        bg-cyan-400/10 text-cyan-300 text-sm mb-6">
          <Zap size={16} />
          Build • Learn • Innovate
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Ready to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500
          bg-clip-text text-transparent">
            Build the Future
          </span>
          ?
        </h2>

        {/* Description */}
        <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
          Join the Electrical Engineering Club and transform ideas into
          impactful real-world solutions.
        </p>

        {/* CTA Button */}
        <a
          href="#join"
          className="group inline-flex items-center gap-3 mt-12
          px-12 py-4 rounded-2xl
          bg-gradient-to-r from-cyan-400 to-blue-500
          text-black font-semibold text-lg
          transition-all duration-300
          hover:shadow-[0_0_40px_rgba(34,211,238,0.8)]
          hover:scale-[1.05]"
        >
          Join the Club
          <ArrowRight
            size={20}
            className="transition-transform duration-300
            group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
}
