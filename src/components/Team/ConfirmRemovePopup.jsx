import React from "react";
import { AlertTriangle, X } from "lucide-react";

import axios from "axios";

function ConfirmRemovePopup({
  isOpen,
  onClose,
  onConfirm,
  member, // full member object
 
}) {
  if (!isOpen) return null;

  const [loading , setLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/remove-member/${member._id}`,{ withCredentials: true });
      onClose();
    } catch (error) {
      console.error("Error removing member:", error);
    }finally{
        setLoading(false);
    }
  }



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="
        relative z-10 w-[90%] max-w-md
        rounded-2xl bg-[#0B1625]
        border border-white/10
        p-6 text-white
        shadow-2xl
      ">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12
          rounded-full bg-red-500/10 text-red-400 mx-auto">
          <AlertTriangle size={24} />
        </div>

        {/* Content */}
        <h3 className="mt-4 text-lg font-semibold text-center">
          Remove Member?
        </h3>

        <p className="mt-2 text-sm text-gray-400 text-center">
          Are you sure you want to remove{" "}
          <span className="text-white font-medium">
            {member?.name || "this member"}
          </span>
          ? This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              flex-1 py-2 rounded-xl
              bg-white/5 hover:bg-white/10
              transition text-sm
            "
          >
            Cancel
          </button>

          <button
            onClick={() => handleDelete()}
            disabled={loading}
            className="
              flex-1 py-2 rounded-xl
              bg-red-500 hover:bg-red-600
              transition text-sm font-medium
              disabled:opacity-60
            "
          >
            {loading ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmRemovePopup;