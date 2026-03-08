// components/Footer.jsx
import {
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Zap,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
import { use } from "react";
;

export default function Footer() {
  const navigate = useNavigate();


  return (
    <footer className="relative bg-linear-to-b from-[#0B0F1A] to-[#070B14] md:md:border-t border-white/10 text-gray-400 overflow-hidden">

      {/* Animated Gradient Glow */}


      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 grid gap-10 md:grid-cols-3">

        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">

            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img
                src={logo}
                alt="OJAS Logo"
                className="h-9 w-9 object-contain"
              />

              <span className="text-xl font-medium tracking-[0.25em] text-cyan-300 group-hover:text-cyan-400 transition">
                OJAS
              </span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
            A student-driven community focused on innovation, hands-on learning,
            and real-world electrical engineering projects.
          </p>
        </div>

        {/* Quick Links */}
        <div className="">
          <h4 className="text-white font-semibold  mb-5 text-lg">
            Quick Links
          </h4>

          <ul className="space-y-3  text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Projects", path: "/projects" },
              { name: "Join Us", path: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="group relative inline-block transition duration-300"
                >
                  <span className="group-hover:text-cyan-400 transition">
                    {link.name}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h4 className="text-white font-semibold mb-5 text-lg">
            Connect With Us
          </h4>

          <div className="flex gap-4">
            {[
              {
                icon: Instagram,
                href: "https://www.instagram.com/team_ojas_nith/?hl=en",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/company/ojasnith/posts/?feedView=all",
              },
              { icon: Github, href: "https://github.com/anujkeshri7/Team-OJAS-frontend" },
              // { icon: Youtube, href: "#" },
              { icon: Mail, href: "mailto:electricalclub@email.com?subject=Website Query&body=Hello Team OJAS!" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-2xl
                  bg-white/5 backdrop-blur-md
                  border border-white/10
                  flex items-center justify-center
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-cyan-400/10
                  hover:border-cyan-400/40
                  hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <Icon
                    size={18}
                    className="group-hover:text-cyan-400 transition"
                  />
                </a>
              );
            })}
          </div>
          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 md:md:border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}
        <span className="text-gray-400"> Departmental Club of Electrical Engineering</span>
        <span className="block mt-1 text-xs text-gray-600">
          Designed with passion
        </span>
      </div>
    </footer>
  );
}