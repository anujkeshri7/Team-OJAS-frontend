import React, { useEffect } from "react";
import teamOjas from "../../assets/teamOjas.jpeg";

export default function AboutTeamOJAS() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0B0F1A] py-16 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Hero Section */}
        <div
          className="text-center mb-20"
          style={{ animation: "slideUpFade 0.8s ease-out" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20 inline-block">
             WHO WE ARE
          </p>

          <h2 className="text-5xl md:text-6xl font-bold text-white mt-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400">
              Team OJAS
            </span>
          </h2>

          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Built by Students. Powered by Passion.
          </p>
        </div>

        {/* Story Section */}
        <div
          className="grid md:grid-cols-2 gap-16 items-center"
          style={{ animation: "slideUpFade 0.8s ease-out 0.15s both" }}
        >
          {/* Left Content */}
          <div className="space-y-8 relative">

            {/* Timeline Glow Line */}
            <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-cyan-500 via-blue-500 to-green-500 opacity-30"></div>

            <div className="pl-8 relative">
              <div className="absolute -left-2 top-2 w-4 h-4 bg-cyan-400 rounded-full blur-sm"></div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Where It All Started
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Team OJAS was born from a simple idea — that the best way to
                learn engineering is to actually do engineering. Founded by
                passionate students of the Electrical Engineering Department
                at NIT Hamirpur.
              </p>
            </div>

            <div className="pl-8 relative">
              <div className="absolute -left-2 top-2 w-4 h-4 bg-blue-400 rounded-full blur-sm"></div>
              <p className="text-gray-400 leading-relaxed">
                Over the years, that small group grew into one of the most
                active technical communities on campus.
              </p>
            </div>

            <div className="pl-8 relative">
              <div className="absolute -left-2 top-2 w-4 h-4 bg-green-400 rounded-full blur-sm"></div>
              <p className="text-white font-semibold text-lg leading-relaxed">
                Today, we're 100+ members strong — and still just getting started.
              </p>
            </div>

          </div>

          {/* Right Image Card */}
          <div className="relative bg-gradient-to-br from-cyan-500/5 to-transparent border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-sm hover:border-cyan-400 transition">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={teamOjas}
                alt="Team OJAS"
                className="w-full h-64 object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="mt-6">
              <h4 className="text-white text-xl font-semibold">
                Built by Students. Powered by Passion.
              </h4>
              <p className="text-gray-400 mt-3 leading-relaxed">
                OJAS is more than a technical club — it’s a movement of builders,
                innovators, and problem solvers.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Animation Keyframe */}
      <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </section>
  );
}