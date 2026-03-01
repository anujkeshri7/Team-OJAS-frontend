import React, { useState, useEffect, useRef } from "react";
import { Zap, BookOpen, Users, Trophy, Calendar } from "lucide-react";
import teamOjas from "../../assets/teamOjas.jpeg";
/* Counter Animation */
function Counter({ target, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return; // Only run when visible

    let startValue = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const interval = setInterval(() => {
      startValue += increment;
      if (startValue >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(startValue));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [start, target]);

  return count;
}

export default function AboutTeamOJAS() {
  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // run only once
        }
      },
      { threshold: 0.3 } // triggers when 30% visible
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: <Zap size={22} />, value: 20, label: "Projects" },
    { icon: <BookOpen size={22} />, value: 15, label: "Workshops" },
    { icon: <Users size={22} />, value: 100, label: "Members" },
    { icon: <Trophy size={22} />, value: 5, label: "Competitions" },
    { icon: <Calendar size={22} />, value: 10, label: "Years of Legacy" },
  ];

  return (
    <section className="relative bg-[#0B0F1A] py-28 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-cyan-400 uppercase tracking-widest text-sm mb-4">
            ⚡ Who We Are
          </p>

          <h2 className="text-5xl md:text-6xl font-black text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Team OJAS</span>
          </h2>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-24">

          {/* Left Timeline */}
          <div className="relative border-l border-cyan-500/30 pl-8 space-y-10">

            <div>
              <div className="absolute -left-3 w-6 h-6 bg-cyan-500 rounded-full blur-sm" />
              <h3 className="text-2xl font-bold text-white mb-3">
                Where It All Started
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Team OJAS was born from a simple idea — that the best way to learn
                engineering is to actually do engineering. Founded by passionate
                students of the Electrical Engineering Department at NIT Hamirpur.
              </p>
            </div>

            <div>
              <div className="absolute -left-3 w-6 h-6 bg-blue-500 rounded-full blur-sm" />
              <p className="text-gray-400 leading-relaxed">
                Over the years, that small group grew into one of the most active
                technical communities on campus.
              </p>
            </div>

            <div>
              <div className="absolute -left-3 w-6 h-6 bg-emerald-500 rounded-full blur-sm" />
              <p className="text-gray-300 text-lg font-semibold">
                Today, we're 100+ members strong — and still just getting started.
              </p>
            </div>

          </div>

          
          {/* Right Card */}
          <div className="relative bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]">

            {/* Image */}
            <div className="mb-4 overflow-hidden rounded-2xl">
              <img
                src={teamOjas} // <-- yaha apni image path daal dena
                alt="Team OJAS"
                className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <h3 className="text-xl font-semi-bold text-white mb-4">
              Built by Students. Powered by Passion.
            </h3>

            <p className="text-gray-400 leading-relaxed">
              OJAS is more than a technical club — it’s a movement of builders,
              innovators, and problem solvers.
            </p>

          </div>

        </div>



      </div>
    </section>
  );
}