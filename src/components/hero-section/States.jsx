import React from 'react'
import { ArrowRight, Zap } from "lucide-react";
function States() {
  return (
    <div>
                {/* Stats Row */}
        <div
          className="mt-0 grid grid-cols-3 gap-8 opacity-0 max-w-2xl mx-auto"
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
    
  )
}

export default States