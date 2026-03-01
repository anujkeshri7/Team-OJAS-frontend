import React, { useState } from "react";
import {
  ArrowRight,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmPopup from "../ConformPopup";
import DeleteProjectPopup from "../ConformPopup";

function ProjectCard({ project, index, isAdminView = false , setRefresh}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="group relative h-full rounded-2xl overflow-hidden"
      style={{
        animation: `slideUpFade 0.6s ease-out ${index * 0.1}s both`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMenu(false);
      }}
    >
      <div className="relative h-full bg-[#0E1424] border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400 transition">
        
        {/* ADMIN 3 DOT MENU */}
        {isAdminView && (
          <div className="absolute top-3 right-3 z-20">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-cyan-300 cursor-pointer"
            >
              <MoreVertical size={18} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-[#0B1020] border border-cyan-500/20 rounded-lg shadow-lg overflow-hidden">
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-cyan-300 hover:bg-cyan-500/10"
                  onClick={() => {
                    // EDIT HANDLER (backend tu jodega)
                    navigate(`/admin/projects/edit/${project._id}`);
                  }}
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                  onClick={() => {
                    setShowConfirm(true);
                    
                  }}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}

        {/* IMAGE */}
        <div className="relative h-48 overflow-hidden bg-black/30">
          <img
            src={project.image.url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? "scale(1.01)" : "scale(1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              {project.domain}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-3">
            {project.shortDescription}
          </p>

          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-2 font-semibold uppercase">
              Tech Stack
            </p>
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

          <button
            onClick={() => navigate(`/projects/${project._id}`)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
            bg-white/5 text-cyan-400 hover:bg-cyan-400/20
            border border-cyan-500/30 hover:border-cyan-400/50
            transition-all duration-300 group/btn"
          >
            <span className="text-sm font-semibold">View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* CONFIRM DELETE POPUP */}
      {
        showConfirm && (
          <DeleteProjectPopup
            isOpen={showConfirm}
            project={project}
            onMoveToTrash={() => {
              // Move to trash handler (backend tu jodega)
              setShowConfirm(false);
            }}
            onDeletePermanent={() => {
              // Delete permanently handler (backend tu jodega)
              setShowConfirm(false);
            }}
            onCancel={() => {
              setShowConfirm(false);
              setRefresh(prev => !prev); // trigger refresh after deletion
            }}
          />
        )
      }
    </div>
  );


}

export default ProjectCard;