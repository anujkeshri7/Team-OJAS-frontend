import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";

function Card({ m }) {
  return (
    <div
      className="group rounded-2xl bg-[#102033]
      border border-white/10 overflow-hidden
      hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]
      transition duration-300"
    >
      {/* Image / Placeholder */}
      <div className="h-44 bg-[#2A3A4E] relative">
        <img
          src={m.profilePic?.url}
          alt={m.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 text-left">
        {/* Name */}
        <h3 className="text-xl font-semibold text-white">
          {m.name}
        </h3>

        {/* Position Badge */}
        <span
          className="inline-block mt-2 px-4 py-1 text-xs
          rounded-full border border-cyan-400/40
          text-cyan-300"
        >
          {m.position}
        </span>

        {/* Description */}
        <p className="mt-4 text-sm text-gray-400 leading-relaxed">
          {m.description}
        </p>

        {/* Social Icons */}
        <div className="mt-6 flex gap-4">
          {m.linkedin && (
            <a
              href={m.linkedin}
              target="_blank"
              className="w-9 h-9 rounded-full
              bg-white/5 flex items-center justify-center
              hover:bg-cyan-400/20 hover:text-cyan-400
              transition text-gray-300"
            >
              <Linkedin size={16} />
            </a>
          )}

          {m.github && (
            <a
              href={m.github}
              target="_blank"
              className="w-9 h-9 rounded-full
              bg-white/5 flex items-center justify-center
              hover:bg-cyan-400/20 hover:text-cyan-400
              transition text-gray-300"
            >
              <Github size={16} />
            </a>
          )}

          {m.instagram && (
            <a
              href={m.instagram}
              target="_blank"
              className="w-9 h-9 rounded-full
              bg-white/5 flex items-center justify-center
              hover:bg-cyan-400/20 hover:text-cyan-400
              transition text-gray-300"
            >
              <Instagram size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
