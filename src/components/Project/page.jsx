import React, { useState } from "react";
import { Cpu, Zap, Wifi, ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";

/* ===== Project Data with Images ===== */
const projects = [
  {
    id: 1,
    title: "Smart Energy Meter",
    domain: "Power Systems",
    description:
      "IoT-based smart energy meter for real-time power monitoring and billing with cloud integration.",
    tech: ["IoT", "ESP32", "Power Electronics", "REST API"],
    icon: <Zap size={28} />,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "EV Charging Station",
    domain: "Electric Vehicles",
    description:
      "Fast DC charging station design with 350kW capacity and intelligent load management.",
    tech: ["MATLAB", "Power Converters", "CAN Bus", "Thermal Analysis"],
    icon: <Cpu size={28} />,
    image: "https://images.unsplash.com/photo-1617442479374-9cf648b4e38b?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "EV Charging Station",
    domain: "Electric Vehicles",
    description:
      "Fast DC charging station design with 350kW capacity and intelligent load management.",
    tech: ["MATLAB", "Power Converters", "CAN Bus", "Thermal Analysis"],
    icon: <Cpu size={28} />,
    image: "https://images.unsplash.com/photo-1617442479374-9cf648b4e38b?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "EV Charging Station",
    domain: "Electric Vehicles",
    description:
      "Fast DC charging station design with 350kW capacity and intelligent load management.",
    tech: ["MATLAB", "Power Converters", "CAN Bus", ],
    icon: <Cpu size={28} />,
    image: "https://images.unsplash.com/photo-1617442479374-9cf648b4e38b?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "EV Charging Station",
    domain: "Electric Vehicles",
    description:
      "Fast DC charging station design with 350kW capacity and intelligent load management.",
    tech: ["MATLAB", "Power Converters", "CAN Bus", "Thermal Analysis"],
    icon: <Cpu size={28} />,
    image: "https://images.unsplash.com/photo-1617442479374-9cf648b4e38b?w=600&h=400&fit=crop",
  },
  
  {
    id: 2,
    title: "EV Charging Station",
    domain: "Electric Vehicles",
    description:
      "Fast DC charging station design with 350kW capacity and intelligent load management.",
    tech: ["MATLAB", "Power Converters", "CAN Bus", "Thermal Analysis"],
    icon: <Cpu size={28} />,
    image: "https://images.unsplash.com/photo-1617442479374-9cf648b4e38b?w=600&h=400&fit=crop",
  },
  
  {
    id: 3,
    title: "Smart Home Automation",
    domain: "IoT & Automation",
    description:
      "Wireless home automation system with voice control and mobile app for lighting, security & HVAC.",
    tech: ["IoT", "Sensors", "WiFi", "Mobile App", "Firebase"],
    icon: <Wifi size={28} />,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
];

/* ===== Project Card with Enhanced Design ===== */


/* ===== Main Projects Page ===== */
export default function Projects() {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const domains = ["All", ...new Set(projects.map((p) => p.domain))];
  const filteredProjects =
    selectedDomain === "All"
      ? projects
      : projects.filter((p) => p.domain === selectedDomain);

  return (
    <section className="relative min-h-screen bg-[#0B0F1A] py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Hero Section */}
        <div className="text-center mb-20" style={{ animation: "slideUpFade 0.8s ease-out" }}>
          <div className="inline-block mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
              ⚡ Featured Projects
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mt-6 leading-tight">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400">Excellence</span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Real-world projects built by our electrical engineering club members. 
            From IoT devices to power systems, we're pushing innovation forward ⚡
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-16" style={{ animation: "slideUpFade 0.8s ease-out 0.15s both" }}>
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedDomain === domain
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
                  : "bg-white/5 text-gray-400 border border-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-400"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="relative rounded-3xl overflow-hidden border border-cyan-500/20
          bg-gradient-to-br from-cyan-500/5 to-transparent
          p-12 text-center backdrop-blur-sm hover:border-cyan-400 transition"
          style={{ animation: "slideUpFade 0.8s ease-out 0.3s both" }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

          <h2 className="text-4xl font-bold text-white mb-3">
            Want to build projects with us?
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Join the Electrical Engineering Club and work on exciting real-world ideas 
            with mentorship from industry professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="px-8 py-4 rounded-full bg-cyan-500 text-black 
              font-bold hover:bg-cyan-400 
              transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
            >
              Join the Club
            </button>

            <button
              className="px-8 py-4 rounded-full bg-white/5 text-cyan-400 font-bold
              border border-cyan-500/30 hover:border-cyan-400 hover:bg-white/10
              transition-all duration-300 flex items-center gap-2"
            >
              Learn More <ArrowRight size={20} className="group-hover:translate-x-1" />
            </button>
          </div>
        </div>

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

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
            transform: translateY(-20px) translateX(10px);
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Remove default button styles */
        button {
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}