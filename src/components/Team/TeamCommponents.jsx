import Card from "./Card";
import axios from "axios";
import { useState, useEffect } from "react";

/* ======================
   Position → Section Map
   ====================== */
const positionToSection = {
  "Club Coordinator": "Club Coordinator",
  "Executive Member":"Executives",
  "Volunteer": "Volunteers",
};

/* ======================
   Section Order
   ====================== */
const SECTION_ORDER = [
  "Club Coordinator",
  "Executives",
  "Volunteers",
];

export default function Team() {
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
  }, []);

  /* ======================
     Group by section
     ====================== */
  const groupedTeam = teamMembers.reduce((acc, member) => {
    const section = positionToSection[member.position] || "Volunteers";
    if (!acc[section]) acc[section] = [];
    acc[section].push(member);
    return acc;
  }, {});

  return (
    <section className="min-h-screen bg-[#0B0F1A] py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Our <span className="text-cyan-400">Team</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Meet the people powering our Electrical Engineering Club ⚡
          </p>
        </div>

        {/* Sections in fixed order */}
        {SECTION_ORDER.map((section) => {
          const members = groupedTeam[section];
          if (!members || members.length === 0) return null;

          return (
            <div key={section} className="mb-28">
              <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-12">
                {section}
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {members.map((member, idx) => (
                  <div
                    key={member.name}
                    className="opacity-0 animate-fadeUp"
                    style={{ animationDelay: `${idx * 120}ms` }}
                  >
                    <Card m={member} />
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
