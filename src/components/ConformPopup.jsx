import React, { useState } from "react";
import { X, AlertTriangle, Trash2, Flame } from "lucide-react";
import axios from "axios";

function DeleteProjectPopup({
  isOpen,
  project, // { title: "Project Name", ... }
  onMoveToTrash,
  
  onCancel,
}) {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen || !project) return null;

  const [loading, setLoading] = useState(false);

  const isConfirmed = inputValue === project.title;

  const onDeletePermanent = async () => {
    if (!isConfirmed) return;

    try {
        setLoading(true);

        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete-project/${project._id}`, { withCredentials: true });

        onCancel();

        
    } catch (error) {
        console.error("Error deleting project permanently:", error);
        
    }finally{
        setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-[90%] max-w-md rounded-2xl bg-[#0E1424] border border-red-500/30 shadow-xl animate-scaleIn">
        
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-red-500/10 text-red-400">
              <AlertTriangle size={22} />
            </div>
            <h2 className="text-lg font-semibold text-white">
              Delete Project
            </h2>
          </div>

          <p className="text-sm text-gray-400 mb-4">
            This action is <span className="text-red-400 font-semibold">dangerous</span>.
            Please type the project name to confirm deletion.
          </p>

          {/* Project Name */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Project name</p>
            <p className="text-sm text-cyan-400 font-semibold">
              {project.title}
            </p>
          </div>

          {/* Input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type project name exactly"
            className="w-full px-4 py-2 mb-6 rounded-lg
            bg-black/30 text-white text-sm
            border border-white/10
            focus:outline-none focus:border-red-400/50"
          />

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onMoveToTrash}
              disabled={!isConfirmed}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm
              border transition
              ${
                isConfirmed
                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40 hover:bg-yellow-500/30"
                  : "bg-white/5 text-gray-500 border-white/10 cursor-not-allowed"
              }`}
            >
              <Trash2 size={16} />
              Move to Trash
            </button>

            <button
              onClick={onDeletePermanent}
              disabled={!isConfirmed}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
              border transition
              ${
                isConfirmed
                  ? "bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  : "bg-white/5 text-gray-500 border-white/10 cursor-not-allowed"
              }`}
            >
              <Flame size={16} />
             {loading ? "Deleting..." : "Delete Permanently"}
            </button>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-scaleIn {
            animation: scaleIn 0.2s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default DeleteProjectPopup;