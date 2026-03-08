import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Briefcase,
  Images,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardContent from "./ui/DeshboardContent";
import MembersContent from "./ui/MembersContent";
import EventsContent from "./ui/EventContent";
import ProjectsContent from "./ui/ProjectsContent";
import GalleryContent from "./ui/GalleryContent";
import AnnouncementsContent from "./ui/AnnouncementsContent";
import TeamPage from "../../Pages/TeamPage";
import AdminAccess from "./ui/AdminAccess";

import axios from "axios";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, { withCredentials: true });
    navigate("/login");
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/check-auth`,
          { withCredentials: true }
        );
        if (res.data.user.role === "SuperAdmin") {
          setIsSuperAdmin(true);
        }

      } catch (error) {
        console.error("Error checking super admin status:", error);

      }
    };

    checkAuth();
  }, [])

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "members", label: "Members", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "gallery", label: "Gallery", icon: Images },
    { id: "announcements", label: "Announcements", icon: Bell },
    ...(isSuperAdmin ? [{ id: "manageAccess", label: "Manage Access", icon: Users }] : []),
  ];

  const getPageContent = () => {
    const contentMap = {
      dashboard: {
        title: "Dashboard",
        description: "Welcome back! Here's your overview.",
        content: <DashboardContent />,
      },
      members: {
        title: "Team Members",
        description: "Manage all team members",
        content: <TeamPage isAdminView={true} />,
      },
      events: {
        title: "Events",
        description: "Create and manage events",
        content: <EventsContent />,
      },
      projects: {
        title: "Projects",
        description: "Track ongoing projects",
        content: <ProjectsContent />,
      },
      gallery: {
        title: "Gallery",
        description: "Manage photo gallery",
        content: <GalleryContent />,
      },
      announcements: {
        title: "Announcements",
        description: "Post announcements",
        content: <AnnouncementsContent />,
      },
      manageAccess: {
        title: "Manage Access",
        description: "Control user permissions and roles",
        content: <AdminAccess />,
      }
    };
    return contentMap[activeTab];
  };

  const currentPage = getPageContent();

  return (
    <div className="flex min-h-screen  text-white ">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"
          } backdrop-blur-xl bg-[#0f1729]/80 border-r border-white/10 
transition-all duration-300 flex flex-col sticky top-0 h-screen`}
      >
        {/* Logo Section */}
        <div className="p-2 md:md:border-b border-cyan-500/10">
          <div className="flex items-center justify-between">
            <div className={`${!sidebarOpen && "hidden"}`}>
              <h1 className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                OJAS
              </h1>
              <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col  p-4 ">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                    ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300"
                    : "text-gray-300 hover:bg-cyan-500/10"
                  }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"}
                />
                <span
                  className={`${!sidebarOpen && "hidden"
                    } font-medium text-sm transition-colors`}
                >
                  {item.label}
                </span>
                {isActive && sidebarOpen && (
                  <ChevronRight size={16} className="ml-auto text-cyan-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 md:border-t border-cyan-500/10">
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 ${!sidebarOpen && "justify-center"
              }`}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className={!sidebarOpen ? "hidden" : "font-medium text-sm"}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}


        {/* Content Area */}
        <div className="flex-1 overflow-y-auto ">
          <div className=" w-full">{currentPage.content}</div>
        </div>
      </main>
    </div>
  );
};


export default AdminPanel;
