import Card from "./Card";
import axios from "axios";
import { useState, useEffect } from "react";

/* ======================
   Position → Section Map
   ====================== */
const positionToSection = {
  "Faculty In-Charge": "Faculty In-Charge",
  "Final Year": "Final Year",
  "Club Coordinator": "Club Coordinator",
  "Coordiantor": "Coordiantor",
  "Executive Member":"Executive",
  "Volunteer": "Volunteer",
};

/* ======================
   Section Order
   ====================== */
const SECTION_ORDER = [
  "Faculty In-Charge",
  "Final Year",
  "Club Coordinator",
  "Coordiantor",
  "Executive",
  "Volunteer",
];

export default function Team({setConfirmOpen, setM, isAdminView = false, refresh}) {
  const [teamMembers, setTeamMembers] = useState([]);
  

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-members`);
        setTeamMembers(res.data.members);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchTeam();
  }, [refresh]);

  /* ======================
     Group by section
     ====================== */
  const groupedTeam = teamMembers.reduce((acc, member) => {
    const section = positionToSection[member.position] || "Volunteer";
    if (!acc[section]) acc[section] = [];
    acc[section].push(member);
    return acc;
  }, {});

  return (
    <section className="min-h-screen bg-[#0B0F1A] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-3 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Our <span className="text-cyan-400">Team</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Meet our team - The Force Behind Every Success
          </p>
        </div>

        {/* Sections in fixed order */}
        {SECTION_ORDER.map((section) => {
          const members = groupedTeam[section];
          if (!members || members.length === 0) return null;

          return (
            <div key={section} className="mb-16">
              <h2 className="pl-4 sm:pl-6 md:pl-7 lg:pl-10 text-2xl md:text-3xl font-semibold text-cyan-400 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                {section}
              </h2>

              {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10"> */}
              
                   {/* new grid classes for better responsiveness and spacing            */}
                              <div className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  xl:grid-cols-4
                  gap-4
                  sm:gap-6
                  lg:gap-8
                  px-4
                  sm:px-6
                  lg:px-8
                  max-w-7xl
                  mx-auto
                ">
                {members.map((member, idx) => (
                  
                  <div
                    key={member.name}
                    className="opacity-0 animate-fadeUp"
                    style={{ animationDelay: `${idx * 120}ms` }}
                  >
                    <Card   setConfirmOpen={setConfirmOpen} setM={setM} m={member} isAdminView={isAdminView} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
}
