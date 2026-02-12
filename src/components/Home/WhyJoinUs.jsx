import { Cpu, BookOpen, Trophy, Users } from "lucide-react";

const reasons = [
  {
    icon: Cpu,
    title: "Hands-on Experience",
    desc: "Work on real-world electrical, IoT and embedded system projects.",
    color: "from-cyan-400 to-blue-500",
    glow: "rgba(34,211,238,0.35)",
  },
  {
    icon: BookOpen,
    title: "Structured Learning",
    desc: "Well-defined roadmaps from fundamentals to advanced topics.",
    color: "from-purple-400 to-pink-500",
    glow: "rgba(168,85,247,0.35)",
  },
  {
    icon: Trophy,
    title: "Competitions & Hackathons",
    desc: "Participate in national-level technical events and challenges.",
    color: "from-yellow-400 to-orange-500",
    glow: "rgba(250,204,21,0.35)",
  },
  {
    icon: Users,
    title: "Team & Mentorship",
    desc: "Learn alongside seniors, alumni and faculty mentors.",
    color: "from-green-400 to-emerald-500",
    glow: "rgba(74,222,128,0.35)",
  },
];

export default function WhyJoinUs() {
  return (
    <section className="bg-[#0B0F1A] py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Why <span className="text-cyan-400">Join Us</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Not just a club — a launchpad for engineers ⚡
          </p>
        </div>

        {/* Cards */}
        <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {reasons.map((r) => {
            const Icon = r.icon;

            return (
              <div
                key={r.title}
                className="group relative"
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0
                  group-hover:opacity-100 transition duration-500 blur-2xl"
                  style={{ background: r.glow }}
                />

                {/* Card */}
                <div
                  className="relative h-full rounded-3xl bg-[#0E1424]/90
                  border border-white/10 p-8 text-center
                  transition-all duration-300
                  hover:-translate-y-3 hover:rotate-[0.3deg]
                  hover:border-white/20"
                >
                  {/* Icon */}
                  <div
                    className={`mx-auto w-16 h-16 rounded-2xl
                    bg-gradient-to-br ${r.color}
                    flex items-center justify-center
                    text-black shadow-xl`}
                  >
                    <Icon size={28} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-8 text-xl font-semibold text-white">
                    {r.title}
                  </h3>

                  {/* Divider */}
                  <div
                    className={`mx-auto mt-4 h-1 w-10 rounded-full
                    bg-gradient-to-r ${r.color}
                    transition-all duration-300
                    group-hover:w-16`}
                  />

                  {/* Description */}
                  <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
