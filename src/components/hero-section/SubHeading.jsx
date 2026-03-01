import React from 'react'
import { ArrowRight, Zap } from "lucide-react";
function SubHeading() {
  return (
    <div>
              {/* Tagline */}
        <div
          className="mt-8 opacity-0"
          style={{ animation: "slideUpFade 1s ease-out 0.8s forwards" }}
        >
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
            <span className="text-cyan-400 font-semibold">Fuelled by Innovation, Driven by Determination</span> •

          </p>

          {/* Animated Underline */}
          <div
            className="mt-4 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent rounded-full"
            style={{
              animation: "expandWidth 1.2s ease-out 1s forwards",
              width: "0%",
              margin: "0 auto",
            }}
          />
        </div>
    </div>
  )
}

export default SubHeading