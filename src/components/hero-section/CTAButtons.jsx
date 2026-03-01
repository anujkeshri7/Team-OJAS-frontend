import React from 'react'
import { ArrowRight, Zap } from "lucide-react";
function CTAButtons() {
  return (
    <div>

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
    </div>
  )
}

export default CTAButtons