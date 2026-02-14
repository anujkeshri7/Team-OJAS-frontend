import React, { useEffect, useState } from "react";
import { ChevronRight, Zap, Code, Cpu, Target, Lightbulb, Bug, Rocket, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const dummyProject = {
  title: "Smart Energy Monitoring System",
  domain: "IoT / Electrical Engineering",
  shortDescription:
    "A real-time energy monitoring system to track power consumption and optimize energy usage.",
  image: {
    url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200",
  },
  tech: ["ESP32", "React", "Node.js", "MongoDB", "MQTT"],
  problemStatement:
    "Traditional energy meters do not provide real-time insights into power usage, leading to inefficient energy consumption.",
  objectives:
    "To design a smart system that monitors energy usage in real-time and provides analytics for optimization.",
  solution:
    "The system uses ESP32 with sensors to collect energy data and sends it to a web dashboard for visualization.",
  architecture:
    "ESP32 → MQTT Broker → Node.js Backend → React Dashboard",
  hardware:
    "ESP32, Current Sensor, Voltage Sensor, Power Supply",
  software:
    "React, Node.js, Express, MongoDB, Cloudinary",
  algorithms:
    "Power calculation algorithm, data aggregation logic",
  implementation:
    "Sensors capture data which is transmitted via MQTT to the backend, processed, and shown on the frontend.",
  results:
    "Accurate real-time monitoring with less than 2% error.",
  challenges:
    "Noise in sensor readings and real-time data synchronization.",
  applications:
    "Smart homes, industries, energy auditing systems.",
  futureScope:
    "AI-based energy prediction and mobile app integration.",
};

const iconMap = {
  problem: Target,
  objectives: Lightbulb,
  solution: Zap,
  architecture: Cpu,
  hardware: Cpu,
  software: Code,
  algorithms: Code,
  implementation: Zap,
  results: Rocket,
  challenges: Bug,
  applications: Lightbulb,
  futureScope: Rocket,
};

export default function ProjectDetail({ onBack }) {
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  
  const { id } = useParams();

  const hasData = (value) => value && String(value).trim().length > 0;

  useEffect(()=>{
      window.scrollTo(0, 0);
    },[])

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-project/${id}`);
        
        if (res.data?.project) {
          setProjectDetails(res.data.project);
        } else {
          setProjectDetails(dummyProject);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
        setProjectDetails(dummyProject);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectDetails();
    } else {
      setProjectDetails(dummyProject);
      setLoading(false);
    }
  }, [id]);

  const getSections = () => {
    if (!projectDetails) return [];

    const allSections = [
      { id: "problem", label: "Problem Statement", content: projectDetails.problemStatement },
      { id: "objectives", label: "Objectives", content: projectDetails.objectives },
      { id: "solution", label: "Solution Overview", content: projectDetails.solution },
      { id: "architecture", label: "Architecture", content: projectDetails.architecture },
      { id: "hardware", label: "Hardware Used", content: projectDetails.hardware },
      { id: "software", label: "Software Stack", content: projectDetails.software },
      { id: "algorithms", label: "Algorithms", content: projectDetails.algorithms },
      { id: "implementation", label: "Implementation", content: projectDetails.implementation },
      { id: "results", label: "Results", content: projectDetails.results },
      { id: "challenges", label: "Challenges", content: projectDetails.challenges },
      { id: "applications", label: "Applications", content: projectDetails.applications },
      { id: "futureScope", label: "Future Roadmap", content: projectDetails.futureScope },
    ];

    return allSections.filter(s => hasData(s.content));
  };

  const sections = getSections();
  const p = projectDetails;
  const imageUrl = p?.image?.url || p?.image || dummyProject.image.url;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-slate-400 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-slate-400">Project not found</p>
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10">
        {/* Back Button */}
        {onBack && (
          <div className="px-6 sm:px-8 lg:px-12 pt-6 pb-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
          </div>
        )}

        {/* Hero Section */}
        <section className="px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              
              {/* Left Content */}
              <div className="space-y-6">
                {hasData(p.domain) && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      {p.domain}
                    </span>
                  </div>
                )}
                
                <div className="space-y-4">
                  {hasData(p.title) && (
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
                      {p.title}
                    </h1>
                  )}
                  {hasData(p.shortDescription) && (
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      {p.shortDescription}
                    </p>
                  )}
                </div>

                {/* Quick Stats */}
                {p.tech && p.tech.length > 0 && (
                  <div className="flex gap-6 pt-4 border-t border-slate-700/50">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Technologies</p>
                      <p className="text-2xl font-bold text-white">{p.tech.length}</p>
                    </div>
                    {sections.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Sections</p>
                        <p className="text-2xl font-bold text-white">{sections.length}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Image */}
              {imageUrl && (
                <div className="relative h-64 sm:h-72 lg:h-96 rounded-xl overflow-hidden border border-slate-700/50">
                  <img
                    src={imageUrl}
                    alt={p.title || "Project"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        {p.tech && p.tech.length > 0 && (
          <section className="px-6 sm:px-8 lg:px-12 py-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {p.tech.map((tech, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-slate-800/40 border border-slate-700/60 rounded-lg text-slate-200 text-sm font-medium hover:bg-slate-800/60 hover:border-slate-600 transition-all duration-300"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Divider */}
        {sections.length > 0 && (
          <div className="px-6 sm:px-8 lg:px-12 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent" />
            </div>
          </div>
        )}

        {/* Details Grid with Expandable Cards */}
        {sections.length > 0 && (
          <section className="px-6 sm:px-8 lg:px-12 py-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12">Project Details</h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {sections.map((section) => {
                  const Icon = iconMap[section.id] || Code;
                  const isExpanded = expandedId === section.id;

                  return (
                    <div
                      key={section.id}
                      onClick={() => setExpandedId(isExpanded ? null : section.id)}
                      className={`group cursor-pointer transition-all duration-300 rounded-xl border overflow-hidden ${
                        isExpanded
                          ? 'col-span-full bg-slate-800/60 border-slate-600'
                          : 'bg-slate-800/30 border-slate-700 hover:border-slate-600 hover:bg-slate-800/40'
                      }`}
                    >
                      {/* Header */}
                      <div className="p-6 flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-2.5 bg-slate-700/50 rounded-lg mt-1">
                            <Icon size={20} className="text-slate-300" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <h3 className="text-lg font-semibold text-white">
                              {section.label}
                            </h3>
                            {!isExpanded && (
                              <p className="text-sm text-slate-400 line-clamp-2">
                                {section.content}
                              </p>
                            )}
                          </div>
                        </div>
                        <ChevronRight
                          size={20}
                          className={`text-slate-500 flex-shrink-0 ml-4 transition-transform duration-300 ${
                            isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'
                          }`}
                        />
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-6 pb-6 border-t border-slate-700/50 pt-6">
                          <p className="text-slate-300 leading-relaxed text-base">
                            {section.content}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Footer Spacing */}
        <div className="h-16" />
      </div>
    </div>
  );
}