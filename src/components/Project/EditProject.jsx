import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";

/* ---------- DEFAULT FORM STATE ---------- */
const defaultFormState = {
  title: "",
  domain: "",
  shortDescription: "",
  problemStatement: "",
  objectives: "",
  solution: "",
  architecture: "",
  hardware: "",
  software: "",
  algorithms: "",
  implementation: "",
  results: "",
  challenges: "",
  applications: "",
  futureScope: "",
  tech: "",
  github: "",
  demo: "",
  image: null,
};

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(defaultFormState);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------- FETCH PROJECT ---------- */
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-project/${id}`,
          { withCredentials: true }
        );

        const project = res.data.project || {};

        // 🔥 IMPORTANT: default + backend merge
        setFormData({
          ...defaultFormState,
          ...project,
          tech: project.tech ? project.tech.join(", ") : "",
          image: null,
        });

        if (project?.image?.url) {
          setPreview(project.image.url);
        }
      } catch {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((p) => ({ ...p, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const techArray = formData.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const form = new FormData();

    // 🔥 SEND ALL FIELDS (even empty ones)
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image") {
        if (value) form.append("image", value);
      } else if (key === "tech") {
        form.append("tech", JSON.stringify(techArray));
      } else {
        form.append(key, value ?? "");
      }
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/edit-project/${id}`,
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0B1220] px-4 py-10 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-6xl bg-[#0F172A] rounded-2xl p-10 space-y-10"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-6 text-cyan-400"
        >
          <ArrowLeft />
        </button>

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input label="Project Title *" name="title" placeholder="Project title" value={formData.title} onChange={handleChange} />
          <Input label="Domain *" name="domain" placeholder="IoT / AI / Electrical" value={formData.domain} onChange={handleChange} />
          <Textarea label="Short Description" name="shortDescription" placeholder="Brief summary" value={formData.shortDescription} onChange={handleChange} />
        </Section>

        {/* IMAGE */}
        <Section title="Project Image">
          <div className="md:col-span-2 relative h-72 border-2 border-dashed border-slate-600 rounded-xl overflow-hidden">
            {preview ? (
              <img src={preview} className="w-full h-full object-contain bg-black/30" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image selected
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg"
            >
              <Pencil size={16} /> Edit Image
            </button>

            <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleImage} />
          </div>
        </Section>

        {/* CORE DETAILS */}
        <Section title="Core Details">
          <Textarea label="Problem Statement" name="problemStatement" placeholder="Problem statement" value={formData.problemStatement} onChange={handleChange} />
          <Textarea label="Objectives" name="objectives" placeholder="Objectives" value={formData.objectives} onChange={handleChange} />
          <Textarea label="Solution Overview" name="solution" placeholder="Solution" value={formData.solution} onChange={handleChange} />
        </Section>

        {/* TECH DETAILS */}
        <Section title="Technical Details">
          <Textarea label="System Architecture" name="architecture" placeholder="Architecture" value={formData.architecture} onChange={handleChange} />
          <Textarea label="Hardware Used" name="hardware" placeholder="Hardware" value={formData.hardware} onChange={handleChange} />
          <Textarea label="Software / Tools" name="software" placeholder="Software" value={formData.software} onChange={handleChange} />
          <Textarea label="Algorithms" name="algorithms" placeholder="Algorithms" value={formData.algorithms} onChange={handleChange} />
          <Input label="Tech Stack" name="tech" placeholder="React, Node, ESP32" value={formData.tech} onChange={handleChange} />
        </Section>

        {/* IMPLEMENTATION */}
        <Section title="Implementation & Results">
          <Textarea label="Implementation" name="implementation" placeholder="Implementation" value={formData.implementation} onChange={handleChange} />
          <Textarea label="Results" name="results" placeholder="Results" value={formData.results} onChange={handleChange} />
          <Textarea label="Challenges" name="challenges" placeholder="Challenges" value={formData.challenges} onChange={handleChange} />
        </Section>

        {/* EXTRAS */}
        <Section title="Extras (Optional)">
          <Textarea label="Applications" name="applications" placeholder="Applications" value={formData.applications} onChange={handleChange} />
          <Textarea label="Future Scope" name="futureScope" placeholder="Future scope" value={formData.futureScope} onChange={handleChange} />
          <Input label="GitHub Link" name="github" placeholder="GitHub link" value={formData.github} onChange={handleChange} />
          <Input label="Demo Link" name="demo" placeholder="Demo link" value={formData.demo} onChange={handleChange} />
        </Section>

        {error && <p className="text-red-400 text-center">{error}</p>}

        <button disabled={loading} className="w-full py-4 bg-cyan-500 rounded-xl font-bold">
          {loading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl text-cyan-400 mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-gray-300 text-sm">{label}</label>
      <input {...props} className="w-full mt-1 px-4 py-2 bg-[#020617] border border-slate-700 rounded-md text-white" />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="md:col-span-2">
      <label className="text-gray-300 text-sm">{label}</label>
      <textarea {...props} rows={4} className="w-full mt-1 px-4 py-2 bg-[#020617] border border-slate-700 rounded-md text-white resize-none" />
    </div>
  );
}