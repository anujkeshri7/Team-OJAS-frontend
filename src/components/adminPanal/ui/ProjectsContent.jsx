import React, { useEffect, useState } from "react";
import {
  Plus,
  Zap,
  Lightbulb,
  Cpu,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import AddProjectForm from "./AddProjectForm";

import { useNavigate } from "react-router-dom";

import ProjectCard from "../../Project/ProjectCard";

const ProjectsContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [refresh, setRefresh] = useState(false); // to trigger re-fetch after adding/editing

  // default icons map (backend ke liye)
  const iconMap = {
    "Power Systems": Zap,
    "Electric Vehicles": Lightbulb,
    "IoT & Automation": Cpu,
    default: TrendingUp,
  };

  const navigate = useNavigate();

  
    

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-projects`,
        );
        const data = await res.json();

        if (data?.projects) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      }
    };

    fetchProjects();
  }, [refresh]);

  return (
    <>
      
        <div className="p-7 flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Our <span className="text-cyan-400">Projects</span>
              </h2>
              <p className="text-gray-400">
                Real-world projects built by Team OJAS
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/add-project")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:opacity-90"
            >
              <Plus size={20} />
              Add Project
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              // SAFE ICON HANDLING
              const IconComponent =
                project.icon || iconMap[project.category] || iconMap.default;

              return (

                <ProjectCard
                  key={project._id}
                  project={project}
                  Icon={IconComponent}
                  isAdminView={true}
                  setRefresh={setRefresh}
                />

              );
            })}
          </div>

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No projects found
            </div>
          )}
        </div>
    </>
  );
};

export default ProjectsContent;
