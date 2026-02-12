const team = [
  {
    name: "Aman Sharma",
    role: "President",
  },
  {
    name: "Neha Verma",
    role: "Vice President",
  },
  {
    name: "Rohit Mehta",
    role: "Technical Lead",
  },
  {
    name: "Anjali Singh",
    role: "Event Coordinator",
  },
];

export default function TeamPreview() {
  return (
    <section className="bg-[#0B0F1A] py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Meet the <span className="text-cyan-400">Team</span>
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((m) => (
            <div
              key={m.name}
              className="rounded-xl border border-cyan-500/20 p-6
              hover:border-cyan-400 transition
              hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
            >
              {/* Avatar Placeholder */}
              <div className="w-20 h-20 mx-auto rounded-full bg-cyan-400/20 mb-4 flex items-center justify-center text-cyan-400 text-2xl">
                {m.name[0]}
              </div>

              <h3 className="text-white font-semibold">{m.name}</h3>
              <p className="text-gray-400 text-sm">{m.role}</p>
            </div>
          ))}
        </div>

        <a
          href="#team"
          className="inline-block mt-10 text-cyan-400 hover:underline"
        >
          View Full Team →
        </a>
      </div>
    </section>
  );
}
