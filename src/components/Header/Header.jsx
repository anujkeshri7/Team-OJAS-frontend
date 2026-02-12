// components/Header.jsx
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";


export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "About",
        link: "/about"
    },
    {
        name: "Events",
        link: "/events"
    },
    {  
        name: "Projects",
        link: "/projects"
    },
    {
        name: "Our Team",
        link: "/members"
    },
    {
        name: "Contact",
        link:"/contact"
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F1A] border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div 
        onClick =  {()=>navigate('/')}
        className="text-xl font-bold text-cyan-400 cursor-pointer">
          ⚡ Electrical Club
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-gray-300">
          {menuItems.map(
            (item) => (
              <Link
                key={item.name}
                to={item.link}
                className="hover:text-cyan-400 transition"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cyan-400 text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0B0F1A] border-t border-cyan-500/20">
          <nav className="flex flex-col px-6 py-4 gap-4 text-gray-300">
            {["Home", "About", "Events", "Projects", "Resources", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-cyan-400 transition"
                  onClick={() => setOpen(false)}
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
