import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GalleryViewer from "../../Gallery/gallery";

const ImageUploader = () => {

  const [folderName, setFolderName] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fileInputRef = useRef(null);

  const handleUpload = (e) => {

    const files = Array.from(e.target.files);

    if (images.length + files.length > 20) {
      alert("Maximum 20 images allowed");
      return;
    }

    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file)
    }));

    setImages((prev) => [...prev, ...newImages]);

  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSubmitUpload = async () => {

    const files = images.map((img) => img.file);

    const formData = new FormData();

    formData.append("title", folderName);

    files.forEach((file) => formData.append("images", file));

    setUploading(true);

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload-images`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {

        alert("Gallery uploaded successfully!");

        setFolderName("");
        setImages([]);
        setRefresh((prev) => !prev);

      } else {

        alert("Error uploading gallery.");

      }

    } catch (error) {

      console.error(error);
      alert("Upload failed");

    } finally {

      setUploading(false);

    }

  };

  useEffect(() => {

    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };

  }, [images]);

  return (
    <>
      <div className="max-w-6xl mx-auto p-8 bg-gray-900 text-white rounded-2xl shadow-xl border border-gray-800">

        {/* Header */}
        <div className="mb-8">

          <h2 className="text-3xl font-bold mb-2">
            Upload Club Gallery
          </h2>

          <p className="text-gray-400 text-sm">
            Upload event photos to organize them into folders.
          </p>

        </div>


        {/* Folder Name */}
        <div className="mb-6">

          <label className="block text-sm text-gray-300 mb-2">
            Folder Name
          </label>

          <input
            type="text"
            placeholder="Enter folder name..."
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
          />

          <p className="text-xs text-gray-400 mt-2">
            To upload to an existing folder, type the exact same folder name.
          </p>

        </div>


        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition bg-gray-800/50"
        >

          <p className="text-gray-300 mb-2">
            Click to select images
          </p>

          <p className="text-gray-500 text-sm">
            Max 20 images
          </p>

          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />

        </div>


        {/* Image Count */}
        {images.length > 0 && (
          <p className="text-sm text-gray-400 mt-4">
            {images.length} / 20 images selected
          </p>
        )}


        {/* Preview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">

          {images.map((img) => (

            <div
              key={img.id}
              className="relative group rounded-xl overflow-hidden shadow-md"
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
            disabled={
              images.length === 0 ||
              folderName.trim() === "" ||
              uploading
            }
            className="px-10 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-xl font-semibold shadow-lg transition"
          >
            {uploading ? "Uploading..." : "Upload Images"}
          </button>

        </div>


        {images.length === 0 && (
          <p className="text-center text-gray-500 mt-6 text-sm">
            No images selected yet
          </p>
        )}

      </div>


      {/* Gallery Viewer */}
      <GalleryViewer
        isAdminView={true}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default ImageUploader;