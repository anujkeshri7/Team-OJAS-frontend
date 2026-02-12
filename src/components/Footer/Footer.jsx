// components/Footer.jsx
import {
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Zap,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0B0F1A] border-t border-white/10 text-gray-400 overflow-hidden">

      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2
        w-[500px] h-[200px] bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14
      grid gap-10 md:grid-cols-3">

        {/* Brand / About */}
        <div>
          <div className="flex items-center gap-2 text-cyan-400 mb-3">
            <Zap size={22} />
            <h3 className="font-semibold text-lg text-white">
              Electrical Engineering Club
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
            A student-driven community focused on innovation, hands-on learning,
            and real-world electrical engineering projects.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Events", href: "#events" },
              { name: "Projects", href: "#projects" },
              { name: "Domains", href: "#domains" },
              { name: "Join Us", href: "#join" },
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-cyan-400 transition"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Connect With Us</h4>

          <div className="flex gap-4">
            {[
              { icon: Instagram, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Github, href: "#" },
              { icon: Youtube, href: "#" },
              { icon: Mail, href: "mailto:electricalclub@email.com" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  className="w-10 h-10 rounded-xl
                  bg-white/5 border border-white/10
                  flex items-center justify-center
                  hover:border-cyan-400/40
                  hover:text-cyan-400
                  hover:bg-cyan-400/10
                  transition"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 py-5 text-center text-sm">
        © {new Date().getFullYear()} Electrical Engineering Club.  
        <span className="text-gray-500"> All rights reserved.</span>
      </div>
    </footer>
  );
}
