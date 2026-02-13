import { X, Upload, Image as ImageIcon, CheckCircle } from "lucide-react";
import React, { useState } from "react";

const AddProjectForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Power Systems",
    description: "",
    techStack: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Power Systems",
    "Electric Vehicles",
    "IoT & Automation",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  /* ================= IMAGE HANDLERS ================= */
  const validateImage = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, WebP, GIF)");
      return false;
    }

    if (file.size > maxSize) {
      setError("Image size must be less than 5MB");
      return false;
    }

    return true;
  };

  const handleImageUpload = (file) => {
    if (!file) return;

    if (!validateImage(file)) return;

    setUploadedFileName(file.name);
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    setImagePreview(null);
    setUploadedFileName("");
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  /* ================= FORM SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.techStack) {
      setError("Please fill all required fields");
      return;
    }

    if (!formData.image) {
      setError("Please upload a project image");
      return;
    }

    const newProject = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      description: formData.description,
      techStack: formData.techStack.split(",").map((item) => item.trim()),
      image: imagePreview,
      fileName: uploadedFileName,
    };

    onAdd(newProject);
  };

  return (
    <div className="w-full bg-[#0a0e27] min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-[#0f1729] border-b border-cyan-500/20  z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Add New <span className="text-cyan-400">Project</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Share your engineering excellence with the world
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-400 hover:text-red-400" />
          </button>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-br from-[#0f1729]/50 to-[#0a0e27]/50 border border-cyan-500/10 rounded-2xl p-8">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm animate-pulse">
              {error}
            </div>
          )}

          {/* Image Upload Section */}
          <div>
            <label className="text-sm font-semibold text-gray-200 mb-3 block uppercase tracking-wide">
              Project Image *
            </label>

            {imagePreview ? (
              <div className="relative group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl border border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-xl flex items-center justify-center">
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="px-5 py-2 bg-cyan-500 text-white rounded-lg cursor-pointer hover:bg-cyan-400 transition-all font-medium text-sm shadow-lg">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={removeImage}
                      className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium text-sm shadow-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-green-500/20 border border-green-500/50 px-3 py-1.5 rounded-full backdrop-blur">
                  <CheckCircle size={16} className="text-green-400" />
                  <span className="text-xs text-green-300 font-medium">
                    Uploaded
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-3 break-all">
                  📁 {uploadedFileName}
                </p>
              </div>
            ) : (
              <label
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? "border-cyan-400 bg-cyan-500/15"
                    : "border-cyan-500/40 bg-cyan-500/5 hover:border-cyan-500/60 hover:bg-cyan-500/10"
                }`}
              >
                <div className={`p-4 rounded-full transition-all ${
                  dragActive ? "bg-cyan-500/30" : "bg-cyan-500/10"
                }`}>
                  <Upload
                    size={40}
                    className={`transition-colors ${
                      dragActive ? "text-cyan-300" : "text-cyan-400"
                    }`}
                  />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-lg">
                    Drag and drop your image
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    or click to browse your files
                  </p>
                </div>
                <p className="text-xs text-gray-500 bg-gray-900/50 px-3 py-1 rounded-full">
                  PNG, JPG, WebP, GIF • Max 5MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Project Title */}
          <div>
            <label className="text-sm font-semibold text-gray-200 mb-3 block uppercase tracking-wide">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Smart Energy Meter"
              className="w-full px-4 py-3 bg-[#0a0e27]/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-semibold text-gray-200 mb-3 block uppercase tracking-wide">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0a0e27]/50 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0a0e27]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-200 mb-3 block uppercase tracking-wide">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project in detail..."
              rows="5"
              className="w-full px-4 py-3 bg-[#0a0e27]/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
            ></textarea>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="text-sm font-semibold text-gray-200 mb-3 block uppercase tracking-wide">
              Tech Stack * (comma-separated)
            </label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="e.g., IoT, ESP32, Python, MATLAB"
              className="w-full px-4 py-3 bg-[#0a0e27]/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Separate technologies with commas
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-cyan-500/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-transparent border border-cyan-500/30 text-gray-300 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/50 font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 font-bold transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:shadow-xl"
            >
              ✨ Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;