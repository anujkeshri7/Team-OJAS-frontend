import React, { useState } from "react";
import {
  Plus,
  X,
  Zap,
  Lightbulb,
  Cpu,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import AddProjectForm from "./AddProjectForm";

const ProjectsContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Smart Energy Meter",
      category: "Power Systems",
      description:
        "IoT-based smart energy meter for real-time power monitoring and billing with cloud integration.",
      techStack: ["IoT", "ESP32", "Power Electronics"],
      icon: Zap,
    },
    {
      id: 2,
      title: "EV Charging Station",
      category: "Electric Vehicles",
      description:
        "Fast DC charging station design with 350kW capacity and intelligent load management.",
      techStack: ["MATLAB", "Power Converters", "CAN Bus"],
      icon: Lightbulb,
    },
    {
      id: 3,
      title: "Solar Inverter",
      category: "Power Systems",
      description:
        "3-phase solar inverter with MPPT algorithm for maximum power extraction.",
      techStack: ["Embedded C", "FPGA", "Power Electronics"],
      icon: Cpu,
    },
    {
      id: 4,
      title: "Robot Arm Control",
      category: "IoT & Automation",
      description:
        "Precision robotic arm with 6 DOF control and real-time feedback system.",
      techStack: ["ROS", "Python", "Mechanical Design"],
      icon: TrendingUp,
    },
  ]);
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Power Systems",
    "Electric Vehicles",
    "IoT & Automation",
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <>
      {!showForm ? (
        
        <div className="p-8">
          {/* Header with Add Button */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Our <span className="text-cyan-400">Projects</span>
              </h2>
              <p className="text-gray-400">
                Real-world projects built by our electrical engineering club
                members
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-400 hover:to-blue-400 font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >
              <Plus size={20} />
              Add Project
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === cat
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-[#0f1729] text-gray-300 border border-cyan-500/20 hover:border-cyan-500/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const IconComponent = project.icon;
              return (
                <div
                  key={project.id}
                  className="group bg-gradient-to-br from-[#0f1729] to-[#1a1f3a] border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
                >
                  {/* Card Header with Icon */}
                  <div className="relative h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-grid-pattern"></div>
                    </div>
                    <div className="relative z-10 p-6 flex items-start justify-between w-full">
                      <IconComponent
                        size={48}
                        className="text-cyan-400 opacity-80"
                      />
                      <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/40 rounded-lg flex items-center justify-center">
                        <Zap size={24} className="text-cyan-400" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="inline-block">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mt-3 mb-3 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 uppercase mb-2 font-semibold">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded hover:bg-cyan-500/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button className="w-full py-3 border border-cyan-500/30 text-cyan-300 rounded-lg hover:bg-cyan-500/10 font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                      View Details
                      <ArrowRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Lightbulb size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">No projects found</p>
            </div>
          )}
        </div>

      ) : (
        <AddProjectForm onClose={() => setShowForm(false)} onAdd={(newProject) => {
          setProjects([...projects, newProject]);
          setShowForm(false);
        }} />
      )}
    </>
  );
};




export default ProjectsContent;