const events = [
  {
    title: "Arduino Bootcamp",
    date: "12 March 2026",
    desc: "Hands-on embedded systems workshop.",
  },
  {
    title: "Power Systems Seminar",
    date: "25 March 2026",
    desc: "Industry-level power grid discussion.",
  },
  {
    title: "IoT Hackathon",
    date: "5 April 2026",
    desc: "24-hour innovation challenge.",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="bg-[#0B0F1A] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          Upcoming <span className="text-cyan-400">Events</span>
        </h2>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {events.map((e) => (
            <div
              key={e.title}
              className="rounded-xl border border-cyan-500/20 p-6
              hover:border-cyan-400 transition
              shadow-[0_0_20px_rgba(34,211,238,0.15)]"
            >
              <p className="text-sm text-cyan-400">{e.date}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                {e.title}
              </h3>
              <p className="mt-3 text-gray-400 text-sm">{e.desc}</p>

              <button
                className="mt-6 px-4 py-2 rounded-md border border-cyan-400
                text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
