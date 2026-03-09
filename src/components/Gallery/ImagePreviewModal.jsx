import React, { useEffect, useState, useRef } from "react";
import { X, Download, Share2, ChevronLeft, ChevronRight } from "lucide-react";

function ImageViewer({ images, index, setIndex, onClose }) {

  const [zoom, setZoom] = useState(1);
  const startX = useRef(null);

  const img = images[index];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index]);

  const next = () => {
    setZoom(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setZoom(1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX.current - endX > 50) next();
    if (endX - startX.current > 50) prev();
  };

  const handleDownload = async () => {
    const res = await fetch(img.url);
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "image";
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Check this image",
        url: img.url
      });
    } else {
      await navigator.clipboard.writeText(img.url);
      alert("Image link copied!");
    }
  };

  const handleZoom = (e) => {
    if (e.deltaY < 0) setZoom((z) => Math.min(z + 0.2, 3));
    else setZoom((z) => Math.max(z - 0.2, 1));
  };

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >

      {/* Top Bar */}
      <div className="absolute top-5 left-0 w-full flex justify-between items-center px-6 text-white">

        <div className="text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur">
          {index + 1} / {images.length}
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition"
        >
          <X size={26} />
        </button>

      </div>


      {/* Prev */}
      {images.length > 1 && (
        <button
          className="absolute left-5 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white transition"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          className="absolute right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white transition"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Image */}
      <img
        src={img.url}
        alt="preview"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleZoom}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `scale(${zoom})` }}
        className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl transition-transform duration-200"
      />

      {/* Bottom Controls */}
      <div
        className="absolute bottom-8 flex gap-4"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition"
        >
          <Download size={18} />
          Download
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition"
        >
          <Share2 size={18} />
          Share
        </button>

      </div>

    </div>
  );
}

export default ImageViewer;