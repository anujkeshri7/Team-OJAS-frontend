import { useForm } from "react-hook-form";
import {
  User,
  Upload,
  Instagram,
  Linkedin,
  Github,
  Briefcase,
  FileText,
} from "lucide-react";

export default function TeamMemberForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("profileImage", data.profileImage[0]);
    formData.append("instagram", data.instagram);
    formData.append("linkedin", data.linkedin);
    formData.append("github", data.github);
    formData.append("bio", data.bio);
    formData.append("position", data.position);

    console.log("Form Data Ready ✅", Object.fromEntries(formData));

    // 👉 Yahan backend API call hogi
    // axios.post("/api/team", formData)
  };

  return (
    <section className="min-h-screen bg-[#0B0F1A] py-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">
            Team Member <span className="text-cyan-400">Form</span>
          </h1>
          <p className="text-gray-400 mt-3">
            Submit your details to be displayed on the official website
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#0E1424] border border-white/10 rounded-2xl p-8 space-y-6"
        >
          {/* Name */}
          <Input
            icon={User}
            label="Full Name"
            placeholder="Your full name"
            error={errors.name}
            {...register("name", { required: true })}
          />

          {/* Image Upload */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Profile Image
            </label>

            <label className="flex items-center gap-4 cursor-pointer
            bg-[#0B0F1A] border border-dashed border-cyan-400/40
            rounded-xl px-4 py-5 text-gray-400 hover:border-cyan-400 transition">
              <Upload className="text-cyan-400" />
              <span>Upload profile photo (JPG / PNG)</span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("profileImage", { required: true })}
              />
            </label>

            {errors.profileImage && (
              <p className="text-red-400 text-sm mt-1">
                Profile image is required
              </p>
            )}
          </div>

          {/* Position */}
          <div>
  <label className="text-sm text-gray-300 mb-2 block">
    Position
  </label>

  <div
    className="flex items-center gap-3 bg-[#0B0F1A]
    border border-white/10 rounded-xl px-4"
  >
    <Briefcase className="text-cyan-400" size={18} />

    <select
      className="
        w-full py-3 bg-[#0B0F1A] text-white outline-none
        appearance-none
      "
      {...register("position", { required: true })}
    >
      <option value="" className="bg-[#0B0F1A] text-gray-400">
        Select position
      </option>

      <option value="Club Coordinator" className="bg-[#0B0F1A] text-white">
        Club Coordinator
      </option>

      <option value="Executive Member" className="bg-[#0B0F1A] text-white">
        Executive Member
      </option>

      <option value="Volunteer" className="bg-[#0B0F1A] text-white">
        Volunteer
      </option>

      <option value="Final Year" className="bg-[#0B0F1A] text-white">
        Final Year
      </option>
    </select>
  </div>

  {errors.position && (
    <p className="text-red-400 text-sm mt-1">
      Please select a position
    </p>
  )}
</div>


          {/* Bio */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Short Bio
            </label>

            <div className="flex gap-3 bg-[#0B0F1A]
            border border-white/10 rounded-xl px-4 py-3">
              <FileText className="text-cyan-400 mt-1" size={18} />
              <textarea
                rows="4"
                placeholder="Write something about yourself..."
                className="w-full bg-transparent text-white outline-none"
                {...register("bio", { required: true })}
              />
            </div>

            {errors.bio && (
              <p className="text-red-400 text-sm mt-1">
                Bio is required
              </p>
            )}
          </div>

          {/* Social Links */}
          <Input
            icon={Instagram}
            label="Instagram URL"
            placeholder="https://instagram.com/username"
            {...register("instagram")}
          />

          <Input
            icon={Linkedin}
            label="LinkedIn URL"
            placeholder="https://linkedin.com/in/username"
            {...register("linkedin")}
          />

          <Input
            icon={Github}
            label="GitHub URL"
            placeholder="https://github.com/username"
            {...register("github")}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-8 py-4 rounded-xl
            bg-gradient-to-r from-cyan-400 to-blue-500
            text-black font-semibold text-lg
            hover:shadow-[0_0_35px_rgba(34,211,238,0.7)]
            transition"
          >
            Submit Form
          </button>
        </form>
      </div>
    </section>
  );
}

/* ===== Reusable Input ===== */
function Input({ icon: Icon, label, error, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-300 mb-2 block">
        {label}
      </label>

      <div className="flex items-center gap-3 bg-[#0B0F1A]
      border border-white/10 rounded-xl px-4">
        <Icon size={18} className="text-cyan-400" />
        <input
          {...props}
          className="w-full py-3 bg-transparent
          text-white placeholder-gray-500 outline-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-1">
          This field is required
        </p>
      )}
    </div>
  );
}
