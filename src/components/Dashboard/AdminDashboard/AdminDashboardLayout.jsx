import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { BarChart3, Users, FileText, Flag, UserCog } from "lucide-react";
import Lottie from "lottie-react";
import dashboardAnimation from "../../../assets/lottie/Businessmen at the table.json";

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>

        <nav className="flex flex-col space-y-3 text-lg">
          <NavLink
            to="overview"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-200"
          >
            <BarChart3 /> Overview
          </NavLink>
          <NavLink
            to="manage-users"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-200"
          >
            <Users /> Manage Users
          </NavLink>
          <NavLink
            to="manage-lessons"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-200"
          >
            <FileText /> Manage Lessons
          </NavLink>
          <NavLink
            to="reported-lessons"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-200"
          >
            <Flag /> Reported Lessons
          </NavLink>
          <NavLink
            to="profile"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-200"
          >
            <UserCog /> Admin Profile
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        {/* Lottie Animation */}
        <div className="w-full">
          <Outlet />
        </div>
        <div className="w-full max-w-lg mb-8">
          <Lottie animationData={dashboardAnimation} loop={true} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
