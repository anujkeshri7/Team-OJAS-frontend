import React from 'react'
import { Cpu, Zap, Wifi, ArrowRight } from "lucide-react";

import {useState} from 'react'

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative h-full rounded-2xl overflow-hidden"
      style={{
        animation: `slideUpFade 0.6s ease-out ${index * 0.1}s both`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div className="relative h-full bg-[#0E1424] border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400 transition">
        
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-black/30">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? "scale(1.1) rotate(1deg)" : "scale(1)",
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
          
          {/* Icon Badge */}
          <div
            className="absolute top-4 right-4 w-14 h-14 rounded-xl 
            bg-cyan-400/10 backdrop-blur-md border border-cyan-400/30
            text-cyan-400 flex items-center justify-center
            transition-all duration-300"
            style={{
              transform: isHovered ? "translateY(-8px) scale(1.1)" : "translateY(0)",
            }}
          >
            {project.icon}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
          
          {/* Domain Tag */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              {project.domain}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-2 font-semibold uppercase">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1.5 rounded-full
                  bg-white/5 hover:bg-cyan-400/10 text-gray-300
                  border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
            bg-white/5 text-cyan-400 hover:bg-cyan-400/20
            border border-cyan-500/30 hover:border-cyan-400/50
            transition-all duration-300 group/btn
            hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            <span className="text-sm font-semibold">View Details</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </button>
        </div>

        {/* Hover Border Animation */}
        <div
          className="absolute inset-0 rounded-2xl border border-cyan-400/0 pointer-events-none
          transition-all duration-300"
          style={{
            borderColor: isHovered ? "rgba(34,211,238,0.5)" : "rgba(34,211,238,0)",
            boxShadow: isHovered
              ? "0 0 40px rgba(34,211,238,0.2), inset 0 0 30px rgba(34,211,238,0.05)"
              : "none",
          }}
        />
      </div>

      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float 3s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectCard
