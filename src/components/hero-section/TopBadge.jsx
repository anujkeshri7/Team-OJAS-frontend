import React from 'react'
import { ArrowRight, Zap } from "lucide-react";
function TopBadge() {
  return (
    <div>
                {/* Top Badge */}
        <div
          className="inline-block mb-8 opacity-0"
          style={{ animation: "slideUpFade 0.8s ease-out 0.2s forwards" }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
            <Zap size={16} className="text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
              Departmental Club of Electrical Engineering
            </span>
          </div>
        </div>
    </div>
  )
}

export default TopBadge