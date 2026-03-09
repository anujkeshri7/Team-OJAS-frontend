import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { set } from "react-hook-form";
import GalleryViewer from "../../Gallery/gallery";

const ImageUploader = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [refresh, setRefresh] = useState(false);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 20) {
      alert("Maximum 20 images allowed");
      return;
    }

    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    const updated = images.filter((img) => img.id !== id);
    setImages(updated);
  };

  const handleSubmitUpload = async() => {
    const files = images.map((img) => img.file);

    console.log("Title:", title);
    console.log("Images:", files);

   
    const formData = new FormData()
    formData.append("title", title)
    files.forEach(file => formData.append("images", file))

    setUploading(true)

    try {
        const res = await  axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload-images`, formData, {
      withCredentials: true,
    })

    if(res.data.success){
      alert("Gallery uploaded successfully!")
      setTitle("")
      setImages([])
    }else{
        alert("Error uploading gallery. Please try again.")
        console.log("Upload error:", res.data.error);
    }
        
    } catch (e) {
        alert("Error uploading gallery. Please try again.")
        console.error("Upload error:", e);
    } finally{
        setUploading(false)
    }

  };

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [images]);

  return (

    <>
     <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-2xl">

      {/* Header */}
      <h2 className="text-3xl font-bold tracking-wide mb-6">
        Club Image Gallery
      </h2>

      {/* Title Input */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2 text-sm">
          Gallery Title
        </label>

        <input
          type="text"
          placeholder="Enter gallery title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Upload Bar */}
      <div className="flex items-center justify-between border border-gray-700 rounded-lg px-4 py-3 bg-gray-800 mb-6">

        <p className="text-gray-300 text-sm">
          Select images to upload (Max 20)
        </p>

        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition"
        >
          Select Images
        </button>

        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

        {images.map((img) => (
          <div
            key={img.id}
            className="relative group rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={img.url}
              alt="preview"
              className="w-full h-40 object-cover group-hover:scale-110 transition duration-300"
            />

            <button
              onClick={() => removeImage(img.id)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-md opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}

      </div>

      {/* Upload Button */}
      <div className="flex justify-center mt-8">

        <button
          onClick={handleSubmitUpload}
          disabled={images.length === 0 || title.trim() === "" || uploading}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-semibold shadow-lg transition"
        >
          {uploading ? "Uploading..." : "Upload Gallery"}
        </button>

      </div>

      {images.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No images selected
        </p>
      )}
    </div>

   <GalleryViewer isAdminView={true} refresh={refresh} setRefresh={setRefresh} />
    </>
   
  );
};

export default ImageUploader;