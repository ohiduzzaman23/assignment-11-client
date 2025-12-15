import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import dashboardAnimation from "../../../assets/lottie/Businessmen at the table.json";
import {
  Menu,
  X,
  BarChart3,
  Users,
  FileText,
  Flag,
  UserCog,
} from "lucide-react";

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const showLottie = location.pathname.endsWith("/overview");

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
      >
        {/* Mobile close */}
        <div className="flex justify-between items-center p-4 lg:hidden">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        {/* Desktop title */}
        <h2 className="hidden lg:block text-2xl font-bold p-6">Admin Panel</h2>

        <nav className="px-4 space-y-2">
          {[
            { to: "overview", icon: BarChart3, label: "Overview" },
            { to: "manage-users", icon: Users, label: "Manage Users" },
            { to: "manage-lessons", icon: FileText, label: "Manage Lessons" },
            { to: "report-lessons", icon: Flag, label: "Reported Lessons" },
            { to: "profile", icon: UserCog, label: "Admin Profile" },
          ].map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition
                ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <h2 className="font-bold text-lg">Admin Dashboard</h2>
          <div />
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />

          {/* Lottie  */}
          {showLottie && (
            <div className="w-full max-w-lg mt-8 mx-auto">
              <Lottie animationData={dashboardAnimation} loop={true} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
