import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { BarChart3, Users, FileText, Flag, UserCog } from "lucide-react";

const AdminDashboardLayout = () => {
  return (
    <div>
      <div className="flex min-h-screen bg-gray-100">
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
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
