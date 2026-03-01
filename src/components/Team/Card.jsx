import React, { useState, useRef, useEffect } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  MoreVertical,
  Trash2,
} from "lucide-react";
import ConfirmRemovePopup from "./ConfirmRemovePopup";

function Card({ setConfirmOpen, setM, m, isAdminView }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      className="
      relative group
      w-full
      max-w-sm mx-auto
      rounded-xl sm:rounded-2xl
      bg-[#102033]
      border border-white/10
      overflow-hidden
      flex flex-col
      transition
      hover:shadow-xl
      "
    >
      {/* Admin menu */}
      {isAdminView && (
        <div ref={menuRef} className="absolute top-2 right-2 z-20">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-full bg-black/40
            hover:bg-black/60 text-white"
          >
            <MoreVertical size={16} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg
              bg-[#0B1625] border border-white/10">
              <button
                className="w-full flex gap-2 px-3 py-2 text-sm
                text-red-400 hover:bg-red-500/10"
                onClick={() => {
                  setM(m);
                  setConfirmOpen(true);
                }}
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          )}
        </div>
      )}

      {/* Image */}
      <div className="w-full aspect-[4/3] bg-[#2A3A4E] overflow-hidden">
        <img
          src={m.profilePic?.url}
          alt={m.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col">
        <h3
          className="
          font-semibold text-white
          text-base sm:text-lg
          leading-tight
          "
        >
          {m.name}
        </h3>

        <span
          className="
          mt-2 w-fit px-3 py-1
          text-xs
          rounded-full border border-cyan-400/40
          text-cyan-300
          "
        >
          {m.position}
        </span>

        <p
          className="
          mt-3
          text-gray-400
          text-sm
          line-clamp-3
          "
        >
          {m.bio ||
            "A dedicated team member focused on learning and collaboration."}
        </p>

        {/* Socials */}
        <div className="mt-auto pt-4 flex gap-3">
          {m.linkedin && (
            <a
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5
              flex items-center justify-center text-gray-300 hover:text-cyan-400 transition"
            >
              <Linkedin size={16} />
            </a>
          )}

          {m.github && (
            <a
              href={m.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5
              flex items-center justify-center text-gray-300 hover:text-cyan-400 transition"
            >
              <Github size={16} />
            </a>
          )}

          {m.instagram && (
            <a
              href={m.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5
              flex items-center justify-center text-gray-300 hover:text-cyan-400 transition"
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