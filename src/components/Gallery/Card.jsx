import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import axios from "axios";

function Card({ img, isAdminView = false , setRefresh }) {

  const [deleting, setDeleting] = useState(false);

  const onDelete = async (img) => {

    try {
      setDeleting(true);

  
     

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/delete-gallery-image`,
        { publicId: img.publicId },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setRefresh(prev => !prev);
      } else {
        alert(res.data.message || "Error deleting image.");
      }

    } catch (error) {
      console.error("Delete error:", error);

      alert(
        error.response?.data?.message ||
        "Server error while deleting image."
      );

    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-md group cursor-pointer">

      {/* Image */}
      <img
        src={img.url}
        alt="gallery"
        className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 ${
          deleting ? "opacity-50" : ""
        }`}
      />

      {/* Dark Hover Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition"></div>

      {/* Delete Button */}
      {isAdminView && (
        <button
 onClick={(e) => {
    e.stopPropagation();
    onDelete(img);
  }}
  disabled={deleting}
  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition flex items-center justify-center"
>
  {deleting ? (
    <Loader2 size={16} className="animate-spin" />
  ) : (
    <Trash2 size={16} />
  )}
</button>
      )}

    </div>
  );
}

export default Card;