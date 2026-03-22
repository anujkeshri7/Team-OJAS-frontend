import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import ojasLogo   from "../../assets/Ojas White.png";
import nimbusLogo from "../../assets/nimbus-white.png";

// ─────────────────────────────────────────────────────────────────────────────
// 🎛️  LOGO VISIBILITY CONTROLS — change these two values to adjust logo opacity
//     Range: 0 (invisible) → 1 (fully visible)
//     idle   = opacity when mouse is NOT hovering the section
//     active = opacity when mouse IS hovering (desktop) / always (mobile)
// ─────────────────────────────────────────────────────────────────────────────
const NIMBUS_OPACITY = { idle: 0.07, active: 0.16 };
const OJAS_OPACITY   = { idle: 0.05, active: 0.11 };
// ─────────────────────────────────────────────────────────────────────────────

// Framer stagger variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

// Pre-generated stars (random floats must stay inline)
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x:    Math.random() * 100,
  y:    Math.random() * 100,
  size: Math.random() * 1.8 + 0.4,
  dur:  2 + Math.random() * 4,
  dly:  Math.random() * 6,
}));

// Stat card
function Stat({ value, label }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 cursor-default select-none"
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 340, damping: 18 }}
    >
      <span className="text-2xl sm:text-3xl md:text-4xl font-black text-cyan-400 tabular-nums">
        {value}
      </span>
      <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-[0.18em]">
        {label}
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const navigate    = useNavigate();
  const sectionRef  = useRef(null);

  // ── Parallax motion values ──────────────────────────────────────────────
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx   = useSpring(rawX, { stiffness: 70, damping: 22 });
  const sy   = useSpring(rawY, { stiffness: 70, damping: 22 });

  const nimbusX = useTransform(sx, [-1, 1], ["-16px", "16px"]);
  const nimbusY = useTransform(sy, [-1, 1], ["-10px", "10px"]);
  const ojasX   = useTransform(sx, [-1, 1], [ "10px","-10px"]);
  const ojasY   = useTransform(sy, [-1, 1], [  "7px", "-7px"]);

  // ── Cursor trail ────────────────────────────────────────────────────────
  const [cursor,    setCursor]    = useState({ x: -999, y: -999 });
  const [trail,     setTrail]     = useState([]);
  const [hovered,   setHovered]   = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const trailTimer = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsPointer(mq.matches);
  }, []);

  useEffect(() => {
    if (!isPointer) return;
    let lx = 0, ly = 0;
    const onMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(((e.clientX - rect.left) / rect.width)  * 2 - 1);
      rawY.set(((e.clientY - rect.top)  / rect.height) * 2 - 1);
      setCursor({ x: e.clientX, y: e.clientY });
      if (Math.hypot(e.clientX - lx, e.clientY - ly) > 9) {
        setTrail(p => [...p.slice(-24), { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() }]);
        lx = e.clientX; ly = e.clientY;
        clearTimeout(trailTimer.current);
        trailTimer.current = setTimeout(() => setTrail([]), 500);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); clearTimeout(trailTimer.current); };
  }, [isPointer, rawX, rawY]);

  const logoOpacity = (cfg) => hovered || !isPointer ? cfg.active : cfg.idle;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden
                 bg-[#040d1d] m-0 p-0"
      onMouseEnter={() => isPointer && setHovered(true)}
      onMouseLeave={() => isPointer && setHovered(false)}
    >

      {/* ── Base gradient — fades INTO the about section colour at bottom ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1835] via-[#070f20] to-[#030914] pointer-events-none" />

      {/* ── Vignette edges ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_60%,#030914_100%)] pointer-events-none" />

      {/* ── Animated background glows ───────────────────────────────────── */}
      <motion.div
        className="absolute rounded-full blur-[90px] pointer-events-none w-[35vw] h-[35vw] max-w-[480px] max-h-[480px] bg-cyan-500/15 top-[4%] left-[4%]"
        animate={{ y: [0, -40, 0], x: [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-[90px] pointer-events-none w-[32vw] h-[32vw] max-w-[440px] max-h-[440px] bg-blue-500/12 top-[40%] right-[2%]"
        animate={{ y: [0, -36, 0], x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute rounded-full blur-[90px] pointer-events-none w-[28vw] h-[28vw] max-w-[360px] max-h-[360px] bg-cyan-400/8 bottom-[12%] left-[42%]"
        animate={{ y: [0, -30, 0], x: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* ── Grid (framer animates backgroundPosition) ───────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(34,211,238,0.07) 1px,transparent 1px)," +
            "linear-gradient(to bottom,rgba(34,211,238,0.07) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Starfield ───────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STARS.map(s => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.08, 0.75, 0.08], scale: [1, 1.5, 1] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.dly }}
          />
        ))}
      </div>

      {/* ── NIMBUS logo — RIGHT side ─────────────────────────────────────
           🎛️  To adjust: change NIMBUS_OPACITY at the top of this file    */}
      <motion.div
        className="absolute pointer-events-none select-none
                   right-[-6%] sm:right-[-4%] top-1/2 -translate-y-1/2
                   w-[55vw] sm:w-[46vw] md:w-[40vw] max-w-[580px]"
        style={{ x: nimbusX, y: nimbusY }}
      >
        <motion.img
          src={nimbusLogo}
          alt=""
          className="w-full h-auto object-contain
                     drop-shadow-[0_0_20px_rgba(34,211,238,0.22)]"
          animate={{ opacity: logoOpacity(NIMBUS_OPACITY) }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* ── OJAS logo — LEFT side ────────────────────────────────────────
           🎛️  To adjust: change OJAS_OPACITY at the top of this file      */}
      <motion.div
        className="absolute pointer-events-none select-none
                   left-[-8%] sm:left-[-6%] top-1/2 -translate-y-1/2
                   w-[38vw] sm:w-[30vw] md:w-[25vw] max-w-[380px]"
        style={{ x: ojasX, y: ojasY }}
      >
        <motion.img
          src={ojasLogo}
          alt=""
          className="w-full h-auto object-contain
                     drop-shadow-[0_0_14px_rgba(34,211,238,0.15)]"
          animate={{ opacity: logoOpacity(OJAS_OPACITY) }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* ── Cursor radial glow ───────────────────────────────────────────── */}
      {isPointer && (
        <div
          className="absolute pointer-events-none rounded-full w-[280px] h-[280px] blur-[30px]
                     bg-[radial-gradient(circle,rgba(34,211,238,0.11)_0%,transparent_70%)]
                     transition-[left,top] duration-90"
          style={{ left: cursor.x - 140, top: cursor.y - 140 }}
        />
      )}

      {/* ── Cursor trail ─────────────────────────────────────────────────── */}
      {isPointer && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {trail.map((dot, i) => {
            const p    = i / trail.length;
            const size = 2 + p * 5;
            return (
              <div
                key={dot.id}
                className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{
                  left:      dot.x,
                  top:       dot.y,
                  width:     size,
                  height:    size,
                  background:`rgba(34,211,238,${p * 0.75})`,
                  boxShadow: `0 0 ${size * 2.5}px rgba(34,211,238,${p * 0.45})`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* ══════════════════ MAIN CONTENT ══════════════════════════════════ */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto
                   px-4 sm:px-8 md:px-12
                   text-center
                   pt-0 pb-0 sm:pt-0 sm:pb-0"
        variants={container}
        initial="hidden"
        animate="show"
      >

        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2
                          rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
            <Zap size={13} className="text-cyan-400 shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold text-cyan-400 uppercase tracking-widest leading-none">
              Departmental Club of Electrical Engineering
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div variants={fadeUp} className="mb-4 sm:mb-5">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                         font-black text-white leading-none tracking-tighter
                         drop-shadow-[0_0_60px_rgba(34,211,238,0.18)]">
            TEAM OJAS
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={fadeUp} className="mb-4 sm:mb-5">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl
                        font-semibold text-cyan-400 tracking-wide">
            Fuelled by Innovation, Driven by Determination
          </p>
          <motion.div
            className="mt-2 h-1 rounded-full mx-auto
                       bg-gradient-to-r from-transparent via-cyan-400 to-transparent
                       max-w-[260px] sm:max-w-xs"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.0, duration: 1.2, ease: "easeOut" }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base md:text-lg
                     text-gray-300/85 leading-relaxed
                     max-w-xl sm:max-w-2xl mx-auto
                     mb-8 sm:mb-10 md:mb-12
                     px-2 sm:px-0"
        >
          Empowering students of{" "}
          <span className="text-cyan-400 font-semibold">NIT Hamirpur</span>{" "}
          to build intelligent systems through innovation, mentorship, and hands‑on learning.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={fadeUp} className="mb-10 sm:mb-12 md:mb-14">
          <motion.button
            onClick={() => navigate("/projects")}
            className="group relative inline-flex items-center gap-2
                       px-7 sm:px-9 py-3.5 sm:py-4
                       rounded-xl bg-cyan-500 text-black font-bold
                       text-sm sm:text-base md:text-lg
                       overflow-hidden select-none
                       shadow-[0_0_26px_rgba(34,211,238,0.4)]"
            whileHover={{
              backgroundColor: "#67e8f9",
              boxShadow: "0 0 52px rgba(34,211,238,0.72),0 0 85px rgba(34,211,238,0.28)",
              y: -2,
            }}
            whileTap={{ scale: 0.96, y: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ x: "-110%" }}
              whileHover={{ x: "110%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <span className="relative">Explore Projects</span>
            <motion.span className="relative" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
              <ArrowRight size={18} />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-10
                     max-w-[280px] sm:max-w-sm md:max-w-md mx-auto"
        >
          <Stat value="75+"  label="Members"  />
          <div className="border-x border-cyan-500/20">
            <Stat value="20+"  label="Projects"  />
          </div>
          <Stat value="100%" label="Passion"   />
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-0.5
                   text-gray-500 text-[9px] sm:text-[10px] uppercase tracking-widest"
        animate={{ y: [0, -9, 0], opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2.2"
             strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span>Scroll</span>
      </motion.div>

      {/* ── Bottom gradient — seamless blend into About section ─────────────
           This dark-to-deeper fade means there's no visible "edge" where     
           the hero ends and About begins. Match About's bg colour here.       */}
      <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-56
                      bg-gradient-to-b from-transparent to-[#0B0F1A]
                      pointer-events-none" />

                      
                      

    </section>
  );
}