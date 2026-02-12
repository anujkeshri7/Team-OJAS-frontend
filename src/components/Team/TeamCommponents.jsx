
import Card from "./Card";

/* ======================
   Dummy Backend Response
   ====================== */
const teamMembers = [
  {
    name: "Dr. R. K. Sharma",
    position: "Faculty Coordinator",
    description: "Guiding the club with academic expertise and mentorship.",
    profilePic: "https://i.pravatar.cc/300?img=12",
    linkedin: "#",
  },
  {
    name: "Aman Sharma",
    position: "President",
    description: "Leads the club and oversees all activities.",
    profilePic: "https://i.pravatar.cc/300?img=32",
    instagram: "#",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Neha Verma",
    position: "Vice President",
    description: "Manages coordination and club operations.",
    profilePic: "https://i.pravatar.cc/300?img=45",
    linkedin: "#",
  },
  {
    name: "Rohit Mehta",
    position: "Technical Lead",
    description: "Heads technical projects and workshops.",
    profilePic: "https://i.pravatar.cc/300?img=18",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Anjali Singh",
    position: "Volunteer",
    description: "Works on embedded systems and IoT projects.",
    profilePic: "https://i.pravatar.cc/300?img=5",
    instagram: "#",
  },
  {
    name: "Kunal Gupta",
    position: "Volunteer",
    description: "Assists in power systems related activities.",
    profilePic: "https://i.pravatar.cc/300?img=22",
  },
];

/* ======================
   Position → Section Map
   ====================== */
const positionGroups = {
  "Faculty Coordinator": "Faculty Coordinator",
  "President": "Core Team",
  "Vice President": "Core Team",
  "Technical Lead": "Core Team",
  "Event Coordinator": "Core Team",
  "Volunteer": "Volunteers",
};

export default function Team() {
  /* ======================
     Group by Section
     ====================== */
  const groupedTeam = teamMembers.reduce((acc, member) => {
    const section = positionGroups[member.position] || "Members";
    if (!acc[section]) acc[section] = [];
    acc[section].push(member);
    return acc;
  }, {});

  return (
    <section className="min-h-screen bg-[#0B0F1A] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Page Header */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Our <span className="text-cyan-400">Team</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Meet the people powering our Electrical Engineering Club ⚡
          </p>
        </div>

        {/* Render Sections */}
        {Object.entries(groupedTeam).map(([section, members]) => (
          <div key={section} className="mb-24">

            <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-12">
              {section}
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {members.map((m, idx) => (

                <Card key={idx} m={m} idx={idx} /> 


              ))}

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
