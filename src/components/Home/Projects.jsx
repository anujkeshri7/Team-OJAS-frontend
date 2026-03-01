import React, { useState } from "react";
import { ArrowRight, Zap, Code, Cpu, ExternalLink, GitBranch,Wifi } from "lucide-react";
import ProjectCard from "../Project/ProjectCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";





export default function FeaturedProjects() {

  const [projects, setProjects] = useState([]);

useEffect(() => {
      const fetchProjects = async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/get-projects`,
          );
          const data = await res.json();
  
          if (data?.projects) {
            setProjects(data.projects.slice(0, 3)); // Get only the first 3 projects for featured section
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
          setProjects([]);
        }
      };
  
      fetchProjects();
    }, []);

  const navigate = useNavigate();
  return (
    <section className="relative bg-[#0B0F1A] py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 -left-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl opacity-30"
          style={{ animation: "floatGlowSlow 12s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl opacity-20"
          style={{ animation: "floatGlowSlow 14s ease-in-out infinite 2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className="text-center mb-4 opacity-0"
          style={{ animation: "slideUpFade 0.8s ease-out 0.1s forwards" }}
        >
         

          <h2 className="text-5xl md:text-6xl font-black text-white mt-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-cyan-400">Projects</span>
          </h2>

          <p
            className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto opacity-0"
            style={{ animation: "slideUpFade 0.8s ease-out 0.3s forwards" }}
          >
            Innovative solutions built by OJAS members showcasing real-world engineering excellence
          </p>
        </div>

        {/* Projects Grid */}
        <div className="mt-16 grid md:grid-cols-3 sm:grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects Button */}
        <div
          className="mt-16 text-center opacity-0"
          style={{ animation: "slideUpFade 0.8s ease-out 1s forwards" }}
        >
          <button 
          onClick={()=>navigate('/projects')}
          className="px-10 py-4 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 text-white font-bold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.7)]">
            View All Projects
          </button>
        </div>

        {/* Bottom Accent Line */}
        <div
          className="mt-20 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 mx-auto max-w-md"
          style={{
            animation: "expandWidth 1.2s ease-out 1.2s forwards",
            width: "0%",
            margin: "0 auto",
          }}
        />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatGlowSlow {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-50px) translateX(30px);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}