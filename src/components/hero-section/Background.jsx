import React, { useState, useEffect } from "react";

import { ArrowRight, Zap } from "lucide-react";
function Background() {

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
          className="absolute rounded-full blur-3xl"
          style={{
            width: "500px",
            height: "500px",
            backgroundColor: "rgba(6, 182, 212, 0.2)",
            top: "10%",
            left: "10%",
            animation: "floatGlow 8s ease-in-out infinite",
          }}
        />

        {/* Secondary Glow */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: "500px",
            height: "500px",
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            top: "40%",
            right: "5%",
            animation: "floatGlow 10s ease-in-out infinite 2s",
          }}
        />

        {/* Tertiary Glow */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: "400px",
            height: "400px",
            backgroundColor: "rgba(34, 211, 238, 0.1)",
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
              className="absolute rounded-full bg-linear-to-r from-cyan-400 to-blue-400"
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
  )
}

export default Background