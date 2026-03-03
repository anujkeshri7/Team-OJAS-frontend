import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Upload,
  Instagram,
  Linkedin,
  Github,
  Briefcase,
  FileText,
  X,
  Loader2,
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
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();
  const bioValue = watch("bio") || "";

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image size must be less than 5MB");
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
    const input = document.querySelector('input[type="file"]');
    if (input) input.value = "";
  };

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (!data.profileImage?.[0]) {
        setErrorMsg("Profile image is required");
        return;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("position", data.position);
      formData.append("bio", data.bio);
      formData.append("profilePic", data.profileImage[0]);
      formData.append("instagram", data.instagram || "");
      formData.append("linkedin", data.linkedin || "");
      formData.append("github", data.github || "");

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/add-member`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccessMsg("Team member added successfully!");
      reset();
      navigate("/members");
      setImagePreview(null);
      setUploadedFile(null);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Failed to submit form"
      );
    }
  };

  return (
    <section className="min-h-screen bg-[#0B0F1A] py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white">
            Team Member <span className="text-cyan-400">Form</span>
          </h1>
          <p className="mt-4 text-gray-400">
            Fill your details to be featured on the website
          </p>
        </div>

        {/* GLOBAL MESSAGES */}
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

        <div className="grid md:grid-cols-3 gap-8">

          {/* IMAGE PREVIEW */}
          <div className="hidden md:block">
            <div className="sticky top-20 bg-[#0E1424] border border-cyan-500/20 rounded-2xl p-6 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    className="w-full h-60 object-cover rounded-xl"
                    alt="preview"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <X size={16} className="text-white" />
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

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:col-span-2 bg-[#0E1424] border border-cyan-500/20 rounded-2xl p-8 space-y-6"
          >
            <Input
              icon={User}
              label="Full Name *"
              placeholder="Your name"
              error={errors.name}
              {...register("name", { required: "Name is required" })}
               className="w-full py-3 bg-transparent text-white outline-none
             focus:bg-transparent focus:text-white
             autofill:bg-transparent
             [-webkit-text-fill-color:white]"
            />

            {/* POSITION */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                Position *
              </label>
              <div className={`flex items-center gap-3 bg-[#0B0F1A] border rounded-xl px-4
                ${errors.position ? "border-red-500/50" : "border-cyan-500/20"}`}>
                <Briefcase className="text-cyan-400" size={18} />
                <select
                  className="w-full py-3 bg-[#0B0F1A] text-white outline-none
             focus:bg-[#0B0F1A] focus:text-white"
                  {...register("position", { required: "Position is required" })}
                >
                 <option value="" className="bg-[#0B0F1A] text-white">
  Select position
</option>
<option className="bg-[#0B0F1A] text-white">Club Coordinator</option>
<option className="bg-[#0B0F1A] text-white">Executive Member</option>
<option className="bg-[#0B0F1A] text-white">Volunteer</option>
<option className="bg-[#0B0F1A] text-white">Final Year</option>
                </select>
              </div>
              {errors.position && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.position.message}
                </p>
              )}
            </div>

            {/* IMAGE */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                Profile Image *
              </label>
              <label className={`flex items-center justify-center gap-3 cursor-pointer
                bg-[#0B0F1A] border-2 border-dashed rounded-xl px-6 py-8
                ${errors.profileImage ? "border-red-500/50" : "border-cyan-500/40"}`}>
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

            {/* BIO */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                Short Bio * (Max 70 chars)
              </label>
              <div className={`flex gap-3 bg-[#0B0F1A] border rounded-xl px-4 py-3
                ${errors.bio ? "border-red-500/50" : "border-cyan-500/20"}`}>
                <FileText className="text-cyan-400 mt-1" size={18} />
                <textarea
                  rows={4}
                  maxLength={70}
                  className="w-full bg-transparent text-white outline-none resize-none"
                  placeholder="Tell us about yourself"
                  {...register("bio", {
                    required: "Bio is required",
                    maxLength: {
                      value: 70,
                      message: "Bio cannot exceed 70 characters",
                    },
                  })}
                />
              </div>
              <p className="text-xs text-gray-400 text-right mt-1">
                {bioValue.length}/70
              </p>
              {errors.bio && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <Input icon={Instagram} label="Instagram" {...register("instagram")} />
            <Input icon={Linkedin} label="LinkedIn" {...register("linkedin")} />
            <Input icon={Github} label="GitHub" {...register("github")} />

            {/* SUBMIT */}
            <button
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500
              text-white font-semibold flex items-center justify-center gap-2
              disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="animate-spin" size={20} />}
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ================= INPUT ================= */
function Input({ icon: Icon, label, error, ...props }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-300 mb-2 block">
        {label}
      </label>
      <div
        className={`flex items-center gap-3 bg-[#0B0F1A] border rounded-xl px-4
        ${error ? "border-red-500/50" : "border-cyan-500/20"}`}
      >
        <Icon size={18} className="text-cyan-400" />
        <input
          {...props}
          className="w-full py-3 bg-transparent text-white outline-none"
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