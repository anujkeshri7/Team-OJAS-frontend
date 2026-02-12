import React, { useState, useEffect } from "react";
import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const trailTimeoutRef = React.useRef(null);

  useEffect(() => {
    let frameId;
    let lastX = 0;
    let lastY = 0;

    const clearTrailWithDelay = () => {
      // Clear any existing timeout
      if (trailTimeoutRef.current) {
        clearTimeout(trailTimeoutRef.current);
      }
      
      // Set new timeout to clear trail after 500ms of no movement
      trailTimeoutRef.current = setTimeout(() => {
        setTrail([]);
      }, 500);
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setMousePosition({ x, y });

      // Only add to trail if cursor moved enough (to avoid too many dots)
      const distance = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
      if (distance > 8) {
        setTrail((prevTrail) => {
          const newTrail = [
            ...prevTrail,
            { x, y, id: Date.now() + Math.random() },
          ];
          // Keep only last 30 positions for performance
          return newTrail.slice(-30);
        });
        lastX = x;
        lastY = y;
        
        // Reset the clear trail timeout
        clearTrailWithDelay();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (trailTimeoutRef.current) {
        clearTimeout(trailTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0B0F1A] overflow-hidden">
      
      {/* Animated Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary Glow */}
        <div 
          className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
          style={{
            top: "10%",
            left: "10%",
            animation: "floatGlow 8s ease-in-out infinite",
          }}
        />
        
        {/* Secondary Glow */}
        <div 
          className="absolute w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl"
          style={{
            top: "40%",
            right: "5%",
            animation: "floatGlow 10s ease-in-out infinite 2s",
          }}
        />

        {/* Tertiary Glow */}
        <div 
          className="absolute w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-3xl"
          style={{
            bottom: "10%",
            left: "50%",
            animation: "floatGlow 12s ease-in-out infinite 4s",
          }}
        />
      </div>

      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          animation: "gridShift 20s linear infinite",
        }}
      />

      {/* Radial Light Effect Following Cursor */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          left: `${mousePosition.x - 150}px`,
          top: `${mousePosition.y - 150}px`,
          transition: "all 0.1s ease-out",
          filter: "blur(40px)",
        }}
      />

      {/* Cursor Trail Dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {trail.map((dot, index) => {
          const opacity = (index / trail.length) * 0.8;
          const size = 2 + (index / trail.length) * 4;
          return (
            <div
              key={dot.id}
              className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
              style={{
                left: `${dot.x}px`,
                top: `${dot.y}px`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                transform: "translate(-50%, -50%)",
                boxShadow: `0 0 ${size * 3}px rgba(34,211,238,${opacity})`,
                pointerEvents: "none",
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-6 text-center">
        
        {/* Top Badge */}
        <div 
          className="inline-block mb-8 opacity-0"
          style={{ animation: "slideUpFade 0.8s ease-out 0.2s forwards" }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
            <Zap size={16} className="text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
              Innovation Hub
            </span>
          </div>
        </div>

        {/* Main Heading - OJAS */}
        <div className="relative mb-6">
          {/* Animated Background for Title */}
          <div 
            className="absolute inset-0 -z-10"
            style={{
              background: "linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(34,211,238,0.05) 100%)",
              borderRadius: "20px",
              filter: "blur(20px)",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />

          <h1 
            className="text-7xl md:text-8xl font-black text-white leading-tight tracking-tighter opacity-0"
            style={{ animation: "slideUpFade 1s ease-out 0.4s forwards" }}
          >
            OJAS
          </h1>

          {/* Gradient Text Effect */}
          <div 
            className="mt-2 text-2xl md:text-4xl font-bold opacity-0"
            style={{ animation: "slideUpFade 1s ease-out 0.6s forwards" }}
          >
            <span className="text-gray-300">Electrical Engineering </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400">
              Club
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div 
          className="mt-8 opacity-0"
          style={{ animation: "slideUpFade 1s ease-out 0.8s forwards" }}
        >
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
            <span className="text-cyan-400 font-semibold">Innovate</span> • 
            <span className="text-cyan-400 font-semibold"> Build</span> • 
            <span className="text-cyan-400 font-semibold"> Power</span> the Future
          </p>

          {/* Animated Underline */}
          <div 
            className="mt-4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
            style={{
              animation: "expandWidth 1.2s ease-out 1s forwards",
              width: "0%",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Buttons */}
        <div 
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center opacity-0"
          style={{ animation: "slideUpFade 1s ease-out 1.2s forwards" }}
        >
          {/* Primary Button */}
          <button
            className="group relative px-10 py-4 rounded-xl bg-cyan-500 text-black font-bold 
            text-lg hover:bg-cyan-400 transition-all duration-300
            shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)]
            overflow-hidden"
          >
            {/* Button Shine Effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                animation: "shimmer 3s infinite",
              }}
            />
            
            <span className="relative flex items-center gap-2">
              Join the Club
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Secondary Button */}
          <button
            className="group relative px-10 py-4 rounded-xl border-2 border-cyan-400 text-cyan-400 font-bold 
            text-lg hover:bg-cyan-400/10 transition-all duration-300
            hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]
            overflow-hidden"
          >
            <span className="relative">Explore Events</span>
          </button>
        </div>

        {/* Stats Row */}
        <div 
          className="mt-16 grid grid-cols-3 gap-8 opacity-0 max-w-2xl mx-auto"
          style={{ animation: "slideUpFade 1s ease-out 1.4s forwards" }}
        >
          <div className="group">
            <div className="text-4xl font-bold text-cyan-400 group-hover:scale-110 transition-transform">
              50+
            </div>
            <div className="text-gray-400 text-sm mt-1 uppercase tracking-wider">Members</div>
          </div>

          <div className="group">
            <div className="text-4xl font-bold text-cyan-400 group-hover:scale-110 transition-transform">
              20+
            </div>
            <div className="text-gray-400 text-sm mt-1 uppercase tracking-wider">Projects</div>
          </div>

          <div className="group">
            <div className="text-4xl font-bold text-cyan-400 group-hover:scale-110 transition-transform">
              100%
            </div>
            <div className="text-gray-400 text-sm mt-1 uppercase tracking-wider">Passion</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 text-gray-400 text-sm"
        style={{
          animation: "bounceScroll 2s ease-in-out infinite",
        }}
      >
        <div>↓</div>
        <div className="text-xs mt-1">Scroll</div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatGlow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-50px) translateX(30px);
          }
        }

        @keyframes gridShift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 60px 60px;
          }
        }

        @keyframes expandWidth {
          from {
            width: 0%;
          }
          to {
            width: 100%;
            max-width: 300px;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes bounceScroll {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-15px);
            opacity: 1;
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