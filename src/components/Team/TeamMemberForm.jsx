import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  User,
  Upload,
  Instagram,
  Linkedin,
  Github,
  Briefcase,
  FileText,
  X,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function TeamMemberForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const fileInput = watch("profileImage");

  const navigate= useNavigate();

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("File size must be less than 5MB");
      return;
    }

    setUploadedFile(file.name);
    setImagePreview(URL.createObjectURL(file));
    setErrorMsg("");
  };

  const removeImage = (e) => {
    e.preventDefault();
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setUploadedFile(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Validate file exists
      if (!data.profileImage || !data.profileImage[0]) {
        setErrorMsg("Profile image is required");
        return;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("position", data.position);
      formData.append("bio", data.bio);
      formData.append("profilePic", data.profileImage[0]); // ✅ Direct File object
      formData.append("instagram", data.instagram || "");
      formData.append("linkedin", data.linkedin || "");
      formData.append("github", data.github || "");

      console.log("Sending file:", data.profileImage[0]);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/add-member`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Response from backend:", res.data);
      setSuccessMsg("Team member added successfully!");
      
      // Reset form
      reset();
      navigate('/members')
      setImagePreview(null);
      setUploadedFile(null);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

    } catch (error) {
      console.log("❌ Error submitting form:", error);
      setErrorMsg(
        error.response?.data?.message || error.message || "Failed to submit form"
      );
    }
  };

  return (
    <section className="min-h-screen bg-[#0B0F1A] py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Team Member <span className="text-cyan-400">Form</span>
          </h1>
          <p className="mt-4 text-gray-400">
            Fill your details to be featured on the official club website ⚡
          </p>
        </div>

        {/* ================= MESSAGES ================= */}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-400">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400">
            {errorMsg}
          </div>
        )}

        {/* ================= MOBILE PREVIEW ================= */}
        {imagePreview && (
          <div className="md:hidden mb-8">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl
              border border-cyan-500/20 shadow-lg"
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">

          {/* ================= DESKTOP PREVIEW ================= */}
          <div className="hidden md:block">
            <div className="sticky top-10 bg-[#0E1424] border border-cyan-500/20 rounded-2xl p-6 text-center">
              <h3 className="text-sm text-gray-400 uppercase mb-4">
                Profile Preview
              </h3>

              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    className="w-full h-60 object-cover rounded-xl"
                    alt="preview"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-3 -right-3 w-8 h-8
                    bg-red-500 rounded-full flex items-center justify-center
                    text-white hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="py-16 text-gray-500">
                  <User size={48} className="mx-auto mb-3 opacity-40" />
                  Upload image to preview
                </div>
              )}

              {uploadedFile && (
                <p className="mt-4 text-xs text-gray-400 break-all">
                  {uploadedFile}
                </p>
              )}
            </div>
          </div>

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:col-span-2 bg-[#0E1424]
            border border-cyan-500/20 rounded-2xl p-8 space-y-6"
          >
            {/* Name */}
            <Input
              icon={User}
              label="Full Name"
              placeholder="Your name"
              error={errors.name}
              {...register("name", { required: "Name is required" })}
            />

            {/* Position */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                Position *
              </label>
              <div className="flex items-center gap-3 bg-[#0B0F1A]
              border border-cyan-500/20 rounded-xl px-4">
                <Briefcase className="text-cyan-400" size={18} />
                <select
                  className="w-full py-3 bg-[#0B0F1A] text-white outline-none"
                  {...register("position", { required: "Select position" })}
                >
                  <option value="" className="bg-[#0B0F1A]">
                    Select position
                  </option>
                  <option className="bg-[#0B0F1A]">Club Coordinator</option>
                  <option className="bg-[#0B0F1A]">Executive Member</option>
                  <option className="bg-[#0B0F1A]">Volunteer</option>
                  <option className="bg-[#0B0F1A]">Final Year</option>
                </select>
              </div>
              {errors.position && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.position.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                Profile Image * (Max 5MB)
              </label>
              <label className="flex items-center justify-center gap-3
              cursor-pointer bg-[#0B0F1A] border-2 border-dashed
              border-cyan-500/40 rounded-xl px-6 py-8
              hover:border-cyan-500 transition">
                <Upload className="text-cyan-400" />
                <span className="text-gray-300">Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("profileImage", {
                    required: "Profile image is required",
                    onChange: handleImageChange,
                  })}
                />
              </label>
              {errors.profileImage && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.profileImage.message}
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                Short Bio *
              </label>
              <div className="flex gap-3 bg-[#0B0F1A]
              border border-cyan-500/20 rounded-xl px-4 py-3">
                <FileText className="text-cyan-400 mt-1" size={18} />
                <textarea
                  rows="4"
                  className="w-full bg-transparent text-white outline-none"
                  placeholder="Tell us about yourself"
                  {...register("bio", { required: "Bio is required" })}
                />
              </div>
              {errors.bio && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* Social */}
            <Input
              icon={Instagram}
              label="Instagram"
              placeholder="https://instagram.com/username"
              {...register("instagram")}
            />
            <Input
              icon={Linkedin}
              label="LinkedIn"
              placeholder="https://linkedin.com/in/username"
              {...register("linkedin")}
            />
            <Input
              icon={Github}
              label="GitHub"
              placeholder="https://github.com/username"
              {...register("github")}
            />

            {/* Submit */}
            <button
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl
              bg-gradient-to-r from-cyan-500 to-blue-500
              text-white font-semibold
              hover:from-cyan-400 hover:to-blue-400
              shadow-[0_0_30px_rgba(34,211,238,0.5)]
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ================= INPUT COMPONENT ================= */
function Input({ icon: Icon, label, error, ...props }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-300 mb-2 block">
        {label}
      </label>
      <div className="flex items-center gap-3 bg-[#0B0F1A]
      border border-cyan-500/20 rounded-xl px-4">
        <Icon size={18} className="text-cyan-400" />
        <input
          {...props}
          className="w-full py-3 bg-transparent
          text-white outline-none"
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}