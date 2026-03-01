import React from 'react'
import { ArrowRight, Zap } from "lucide-react";
function Description() {
  return (
    <div>    {/* Gradient Text Effect */}
          <div
            className=" text-2xl md:text-4xl font-semi-bold opacity-0"
            style={{ animation: "slideUpFade 1s ease-out 0.6s forwards" }}
          >
            <span className="text-gray-300 text-xl"> Empowering students of 
              <span className="text-transparent bg-clip-text bg-linear-to-r text-xl from-cyan-400 via-cyan-300 to-blue-400">
               Electrical Engineering 
             </span>
             NIT Hamirpur to build intelligent systems in IoT, Embedded Design, Machine Learning and Full-Stack Development through hands-on projects and mentorship. 
            </span>

          </div></div>
  )
}

export default Description