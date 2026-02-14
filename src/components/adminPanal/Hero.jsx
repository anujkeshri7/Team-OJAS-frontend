import React, { useState } from "react";
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

import DashboardContent from "./ui/DeshboardContent";
import MembersContent from "./ui/MembersContent";
import EventsContent from "./ui/EventContent";
import ProjectsContent from "./ui/ProjectsContent";
import GalleryContent from "./ui/GalleryContent";
import AnnouncementsContent from "./ui/AnnouncementsContent";
import TeamPage from "../../Pages/TeamPage";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "members", label: "Members", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "gallery", label: "Gallery", icon: Images },
    { id: "announcements", label: "Announcements", icon: Bell },
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
        content: <TeamPage />,
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
    };
    return contentMap[activeTab];
  };

  const currentPage = getPageContent();

  return (
    <div className="flex h-screen bg-[#0a0e27] text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-[#0f1729] to-[#0a0e27] border-r border-cyan-500/10 transition-all duration-300 flex flex-col overflow-y-auto`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-cyan-500/10">
          <div className="flex items-center justify-between">
            <div className={`${!sidebarOpen && "hidden"}`}>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
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
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300"
                    : "text-gray-300 hover:bg-cyan-500/10"
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"}
                />
                <span
                  className={`${
                    !sidebarOpen && "hidden"
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
        <div className="p-4 border-t border-cyan-500/10">
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200 border border-red-500/20 ${
              !sidebarOpen && "justify-center"
            }`}
          >
            <LogOut size={20} />
            <span className={!sidebarOpen ? "hidden" : "font-medium text-sm"}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#0f1729] border-b border-cyan-500/10 px-8 py-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {currentPage.title}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {currentPage.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors relative">
                <Bell size={20} className="text-gray-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl">{currentPage.content}</div>
        </div>
      </main>
    </div>
  );
};


export default AdminPanel;
