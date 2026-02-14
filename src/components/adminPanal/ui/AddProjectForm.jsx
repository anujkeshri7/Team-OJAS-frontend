import axios from "axios";
import { useState } from "react";

export default function AddProject() {
  const [formData, setFormData] = useState({
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
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    // REQUIRED VALIDATION
    if (!formData.title || !formData.domain || !formData.image) {
      setError("Title, Domain and Image are required");
      return;
    }

    setLoading(true);
    setError("");

    const techArray = formData.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    form.set("tech", JSON.stringify(techArray));

    try {

      console.log("Submitting form data:", form);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/add-project`,
        form,
        { withCredentials: true }
      );
      alert("Project added successfully 🚀");
    } catch (err) {
      setError("Failed to upload project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0B1220] px-4 py-10 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-[#0F172A] rounded-2xl p-10 space-y-10 shadow-[0_0_40px_rgba(56,189,248,0.1)]"
      >
        {/* HEADER */}
        <header className="border-b border-slate-700 pb-6">
          <h1 className="text-3xl font-bold text-white">
            Add New <span className="text-cyan-400">Project</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Fill project details for showcase & portfolio
          </p>
        </header>

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input
            label="Project Title *"
            name="title"
            placeholder="Smart Energy Monitoring System"
            onChange={handleChange}
          />
          <Input
            label="Domain *"
            name="domain"
            placeholder="IoT / Electrical / AI"
            onChange={handleChange}
          />
          <Textarea
            label="Short Description"
            name="shortDescription"
            placeholder="Brief summary of the project (optional)"
            onChange={handleChange}
          />
        </Section>

        {/* IMAGE */}
        <Section title="Project Image *">
          <label className="md:col-span-2 h-72 flex items-center justify-center border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-cyan-400 transition">
            {preview ? (
              <img
                src={preview}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-gray-400">
                Click to upload project image
              </span>
            )}
            <input type="file" hidden accept="image/*" onChange={handleImage} />
          </label>
        </Section>

        {/* CORE */}
        <Section title="Core Details">
          <Textarea
            label="Problem Statement"
            name="problemStatement"
            placeholder="What problem does your project solve?"
            onChange={handleChange}
          />
          <Textarea
            label="Objectives"
            name="objectives"
            placeholder="Goals and targets (optional)"
            onChange={handleChange}
          />
          <Textarea
            label="Solution Overview"
            name="solution"
            placeholder="High-level solution explanation"
            onChange={handleChange}
          />
        </Section>

        {/* TECH */}
        <Section title="Technical Details">
          <Textarea
            label="System Architecture"
            name="architecture"
            placeholder="Block diagram explanation (optional)"
            onChange={handleChange}
          />
          <Textarea
            label="Hardware Used"
            name="hardware"
            placeholder="ESP32, Sensors, Relays"
            onChange={handleChange}
          />
          <Textarea
            label="Software / Tools"
            name="software"
            placeholder="React, Node, MATLAB"
            onChange={handleChange}
          />
          <Textarea
            label="Algorithms"
            name="algorithms"
            placeholder="Control logic / ML / Signal processing"
            onChange={handleChange}
          />
          <Input
            label="Tech Stack"
            name="tech"
            placeholder="ESP32, React, MongoDB"
            onChange={handleChange}
          />
        </Section>

        {/* IMPLEMENTATION */}
        <Section title="Implementation & Results">
          <Textarea
            label="Implementation"
            name="implementation"
            placeholder="How you built the project"
            onChange={handleChange}
          />
          <Textarea
            label="Results"
            name="results"
            placeholder="Outputs, graphs, performance"
            onChange={handleChange}
          />
          <Textarea
            label="Challenges"
            name="challenges"
            placeholder="Difficulties faced (optional)"
            onChange={handleChange}
          />
        </Section>

        {/* EXTRAS */}
        <Section title="Extras (Optional)">
          <Textarea
            label="Applications"
            name="applications"
            placeholder="Real-world usage"
            onChange={handleChange}
          />
          <Textarea
            label="Future Scope"
            name="futureScope"
            placeholder="Possible improvements"
            onChange={handleChange}
          />
          <Input
            label="GitHub Link"
            name="github"
            placeholder="https://github.com/username/project"
            onChange={handleChange}
          />
          <Input
            label="Demo Link"
            name="demo"
            placeholder="https://demo-link.com"
            onChange={handleChange}
          />
        </Section>

        {error && (
          <p className="text-red-400 text-center font-medium">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-bold tracking-wide transition disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Publish Project"}
        </button>
      </form>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-cyan-400 mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <input
        {...props}
        className="w-full mt-1 px-4 py-2 bg-[#020617] border border-slate-700 rounded-md text-white focus:outline-none focus:border-cyan-400"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="md:col-span-2">
      <label className="text-sm text-gray-300">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="w-full mt-1 px-4 py-2 bg-[#020617] border border-slate-700 rounded-md text-white resize-none focus:outline-none focus:border-cyan-400"
      />
    </div>
  );
}
