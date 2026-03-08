import React from "react";
import {
  Cpu,
  Wifi,
  Brain,
  Palette,
  Globe,
  Smartphone,
  Video,
} from "lucide-react";
import DomainCard from "./ui/DomainCard";

const domains = [
  {
    icon: <Wifi size={40} />,
    title: "IoT",
    desc: "Sensors, ESP32 & smart automation.",
    color: "from-green-400 to-emerald-400",
    accentBg: "bg-green-500/10",
    borderColor: "border-green-500/20",
    textColor: "text-green-400",
  },
  {
    icon: <Cpu size={40} />,
    title: "Embedded Systems",
    desc: "Microcontrollers & real-time systems.",
    color: "from-cyan-400 to-blue-400",
    accentBg: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    textColor: "text-cyan-400",
  },
  {
    icon: <Brain size={40} />,
    title: "Machine Learning",
    desc: "AI models & data analysis.",
    color: "from-purple-400 to-pink-400",
    accentBg: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    textColor: "text-purple-400",
  },
  {
    icon: <Palette size={40} />,
    title: "Graphic Designing",
    desc: "Branding, UI/UX & posters.",
    color: "from-yellow-400 to-orange-400",
    accentBg: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    textColor: "text-yellow-400",
  },
  {
    icon: <Globe size={40} />,
    title: "Web Development",
    desc: "React, Next.js & modern websites.",
    color: "from-blue-400 to-indigo-400",
    accentBg: "bg-blue-500/10",
    borderColor: "md:border-blue-500/20",
    textColor: "text-blue-400",
  },
  {
    icon: <Smartphone size={40} />,
    title: "App Development",
    desc: "Android & iOS apps.",
    color: "from-pink-400 to-rose-400",
    accentBg: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    textColor: "text-pink-400",
  },
  {
    icon: <Video size={40} />,
    title: "Video Editing",
    desc: "Cinematic edits, promotional videos .",
    color: "from-red-400 to-orange-400",
    accentBg: "bg-red-500/10",
    borderColor: "border-red-500/20",
    textColor: "text-red-400",
  },
];




export default function Domains() {
  return (
    <section id="domains" className="relative bg-[#0B0F1A] py-14 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-30"
          style={{ animation: "floatGlowSlow 12s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20"
          style={{ animation: "floatGlowSlow 14s ease-in-out infinite 3s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className="text-center mb-4 opacity-0"
          style={{ animation: "slideUpFade 0.8s ease-out 0.1s forwards" }}
        >
          

          <h2 className="text-5xl md:text-6xl font-black text-white mt-6">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-400">Domains</span>
          </h2>

          <p
            className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto opacity-0"
            style={{ animation: "slideUpFade 0.8s ease-out 0.3s forwards" }}
          >
            Explore the diverse fields of electrical engineering we specialize in
          </p>
        </div>

        {/* Domains Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {domains.map((domain, index) => (
            <DomainCard key={domain.title} domain={domain} index={index} />
          ))}
        </div>

        {/* Bottom Accent */}
        <div
          className="mt-20 h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 mx-auto max-w-md"
          style={{
            animation: "expandWidth 1.2s ease-out 1.2s forwards",
            width: "0%",
            margin: "0 auto",
          }}
        />

      </div>

      {/* CSS Animations */}
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

        @keyframes floatGlowSlow {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-50px) translateX(30px);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}