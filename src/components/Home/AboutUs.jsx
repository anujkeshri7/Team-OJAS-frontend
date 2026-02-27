import React, { useState, useEffect } from "react";
import { Zap, BookOpen, Users, Trophy } from "lucide-react";

// Counter Animation Component
function Counter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [target, duration]);

  return count;
}

export default function AboutClub() {
  const stats = [
    {
      count: 20,
      label: "Projects",
      icon: <Zap size={28} />,
      color: "from-cyan-400 to-blue-400",
    },
    {
      count: 15,
      label: "Workshops",
      icon: <BookOpen size={28} />,
      color: "from-blue-400 to-cyan-400",
    },
    {
      count: 100,
      label: "Members",
      icon: <Users size={28} />,
      color: "from-cyan-400 to-emerald-400",
    },
    {
      count: 5,
      label: "Competitions",
      icon: <Trophy size={28} />,
      color: "from-emerald-400 to-cyan-400",
    },
  ];

  return (
    <section className="relative bg-[#0B0F1A] py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl opacity-40"
          style={{ animation: "floatGlowSlow 10s ease-in-out infinite" }}
        />
        <div 
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-30"
          style={{ animation: "floatGlowSlow 12s ease-in-out infinite 2s" }}
        />
      </div>

      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div 
          className="text-center mb-16 opacity-0"
          style={{ animation: "slideUpFade 0.8s ease-out 0.2s forwards" }}
        >
          <div className="inline-block mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
              ⚡ Who We Are
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Section - Text */}
          <div className="space-y-6">
            <div 
              className="opacity-0"
              style={{ animation: "slideUpFade 0.8s ease-out 0.4s forwards" }}
            >
              <h2 className="text-5xl md:text-5xl font-black text-white leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">OJAS</span>
              </h2>
            </div>

            <div 
              className="space-y-4 opacity-0"
              style={{ animation: "slideUpFade 0.8s ease-out 0.6s forwards" }}
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                <span className="font-semibold text-cyan-400">OJAS</span> is a dynamic student-driven community 
                dedicated to fostering innovation, hands-on learning, and real-world engineering excellence. 
                We are passionate about building engineers who can solve tomorrow's challenges.
              </p>

              <p className="text-gray-400 leading-relaxed">
                From cutting-edge power systems to embedded electronics, IoT solutions to renewable energy, 
                we explore the full spectrum of electrical engineering. Our members collaborate on ambitious 
                projects, conduct insightful workshops, and push the boundaries of what's possible.
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                  <p className="text-gray-300">Industry-ready training and mentorship</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                  <p className="text-gray-300">Hands-on project experience</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                  <p className="text-gray-300">Competitive edge in engineering challenges</p>
                </div>
              </div>
            </div>

           
          </div>

          {/* Right Section - Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative opacity-0"
                style={{
                  animation: `slideUpFade 0.8s ease-out ${0.5 + index * 0.15}s forwards`,
                }}
              >
                {/* Card Container */}
                <div
                  className="relative rounded-2xl border border-cyan-500/20 p-6 text-center
                  hover:border-cyan-400 transition-all duration-300
                  bg-gradient-to-br from-cyan-500/5 to-blue-500/5
                  hover:from-cyan-500/10 hover:to-blue-500/10
                  group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]
                  overflow-hidden h-full"
                >
                  {/* Background Gradient */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}
                  />

                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20
                    text-cyan-400 flex items-center justify-center mx-auto mb-4
                    group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50
                    transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                  >
                    {stat.icon}
                  </div>

                  {/* Counter */}
                  <h3 
                    className={`text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                  >
                    <Counter target={stat.count} />
                    {stat.count > 9 ? "+" : ""}
                  </h3>

                  {/* Label */}
                  <p className="text-gray-400 font-semibold uppercase tracking-wider text-sm">
                    {stat.label}
                  </p>

                  {/* Hover Line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                  />
                </div>

                {/* Glow Effect on Hover */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300 -z-20"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div 
          className="mt-20 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0"
          style={{
            animation: "expandWidth 1.2s ease-out 1s forwards",
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
            transform: translateY(-40px) translateX(20px);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0%;
          }
          to {
            width: 100%;
            max-width: 400px;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}