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
      aspect-[3/5]              /* 🔥 consistent ratio */
      rounded-xl sm:rounded-2xl
      bg-[#102033]
      border border-white/10
      overflow-hidden
      flex flex-col
      transition
      "
    >
      {/* Admin menu */}
      {isAdminView && (
        <div ref={menuRef} className="absolute top-2 right-2 z-20">
          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 sm:p-2 rounded-full bg-black/40
            hover:bg-black/60 text-white"
          >
            <MoreVertical size={16} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg
              bg-[#0B1625] border border-white/10">
              <button
                className="w-full flex gap-2 px-3 py-2 text-xs sm:text-sm
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
      <div className="w-full aspect-[4/3] bg-[#2A3A4E]">
        <img
          src={m.profilePic?.url}
          alt={m.name}
          className=" w-40 h-30 sm:w-80 sm:h-50 md:w-80 md:h-60 object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-3 sm:p-5 flex flex-col">
        <h3
          className="
          font-semibold text-white
          text-[clamp(0.85rem,2.5vw,1.1rem)]
          leading-tight
          "
        >
          {m.name}
        </h3>

        <span
          className="
          mt-1 sm:mt-2 w-fit px-2.5 py-0.5
          text-[clamp(0.6rem,2vw,0.75rem)]
          rounded-full border border-cyan-400/40
          text-cyan-300
          "
        >
          {m.position}
        </span>

        <p
          className="
          mt-2 sm:mt-3
          text-gray-400
          text-[clamp(0.65rem,2vw,0.85rem)]
          line-clamp-3
          "
        >
          {m.bio ||
            "A dedicated team member focused on learning and collaboration."}
        </p>

        {/* Socials */}
        <div className="mt-auto pt-3 flex gap-2 sm:gap-3">
          {m.linkedin && (


            <a 
            href={m.linkedin}
            target={"_blank"}
            
            rel="noopener noreferrer"
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/5
              flex items-center justify-center text-gray-300 hover:text-cyan-400">
              <Linkedin size={14} />
            </a>
          )}
          {m.github && (
            <a 
            href={m.github} 
            target={"_blank"}
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/5
              flex items-center justify-center text-gray-300 hover:text-cyan-400">
              <Github size={14} />
            </a>
          )}
          {m.instagram && (
            <a 
            href={m.instagram}
            target={"_blank"}
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/5
              flex items-center justify-center text-gray-300 hover:text-cyan-400">
              <Instagram size={14} />
            </a>
          )}
        </div>
      </div>


      
    
    </div>

  );
}

export default Card;