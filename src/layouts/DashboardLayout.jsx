import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Eye,
  Heart,
  Bookmark,
  PlusCircle,
  LayoutList,
  Settings,
  ArrowRight,
  MoreHorizontal,
  UserCog,
} from "lucide-react";
import { FaCrown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../components/Shared/Container";
import useAuth from "../hooks/useAuth";

const stats = [
  { icon: BookOpen, label: "Lessons Created", value: 5 },
  { icon: Eye, label: "Total Views", value: "2,345" },
  { icon: Heart, label: "Total Likes", value: 189 },
  { icon: Bookmark, label: "Total Saves", value: 67 },
];

const DashboardLayout = ({ userName = "Demo User" }) => {
  const [recentLessons, setRecentLessons] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Quick Actions
  const quickActions = [
    {
      icon: PlusCircle,
      title: "Add New Lesson",
      desc: "Share your wisdom",
      link: "/add-lesson",
    },
    {
      icon: LayoutList,
      title: "My Lessons",
      desc: "Manage your created lessons",
      link: "/my-lessons",
    },
    {
      icon: Bookmark,
      title: "Favorites",
      desc: "View your saved lessons",
      link: "/favorites",
    },
    {
      icon: Settings,
      title: "Profile Settings",
      link: "/profile",
    },
    {
      icon: UserCog,
      title: "Admin",
      link: "/admin",
    },
  ];

  if (user?.role === "admin") {
    quickActions.push({
      icon: Settings,
      title: "Admin Dashboard",
      desc: "Manage users & lessons",
      link: "/admin",
    });
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/lessons?limit=5`)
      .then((res) => setRecentLessons(res.data))
      .catch((err) => console.error("Failed to fetch lessons:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/lessons/${id}`);
      setRecentLessons((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Failed to delete lesson:", err);
    }
  };
  return (
    <div className="min-h-screen bg-[#f7f4ee] text-gray-800">
      <Container>
        <div className="px-6 py-12">
          {/* Top Bar */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-[#2b2b2b]">
                Welcome back, {userName}!
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                Here's an overview of your LifeLessons journey
              </p>
            </div>
            <div className="mt-1">
              <Link to="/pricing" className="px-4 py-2 my-g-btn">
                <FaCrown className="text-white text-lg inline mr-2" />
                Upgrade to Premium
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-[#fff4e6] text-orange-500 w-10 h-10 rounded-md flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold leading-none">
                        {s.value}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {s.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Left: Quick Actions */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-4">
                {quickActions.map((qa, idx) => {
                  const Icon = qa.icon;
                  return qa.link ? (
                    <Link
                      key={idx}
                      to={qa.link}
                      className="w-full flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-[#fff6e8] text-orange-500 p-3 rounded-lg">
                          <Icon size={18} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{qa.title}</div>
                          <div className="text-sm text-gray-500">{qa.desc}</div>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-gray-400" />
                    </Link>
                  ) : (
                    <button
                      key={idx}
                      className="w-full flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-[#fff6e8] text-orange-500 p-3 rounded-lg">
                          <Icon size={18} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{qa.title}</div>
                          <div className="text-sm text-gray-500">{qa.desc}</div>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Recent Lessons */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Your Recent Lessons</h3>
                <Link
                  to="/my-lessons"
                  className="text-sm text-gray-600 hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {recentLessons.length ? (
                  recentLessons.slice(0, 3).map((l, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center relative cursor-pointer hover:shadow-md transition"
                      onClick={(e) => {
                        if (e.target.closest("button")) return;
                        navigate(`/lessons/${l._id}`);
                      }}
                    >
                      <img
                        src={l.image || "/mountain.jpg"}
                        alt={l.title}
                        className="w-36 h-20 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {l.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {l.content || l.desc || "No description"}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                          <div className="flex items-center gap-1">
                            <Eye size={14} /> {l.views || 0}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart size={14} /> {l.likes || 0}
                          </div>
                          <div className="flex items-center gap-1">
                            <Bookmark size={14} /> {l.comments?.length || 0}
                          </div>
                        </div>
                      </div>

                      {/* 3-dot menu */}
                      <div className="relative">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-full"
                          onClick={() =>
                            setMenuOpen(menuOpen === l._id ? null : l._id)
                          }
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {menuOpen === l._id && (
                          <div className="absolute right-0 top-8 bg-white shadow-lg border border-gray-200 rounded-md w-32 z-10">
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => navigate(`/edit-lesson/${l._id}`)}
                            >
                              Edit
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                              onClick={() => handleDelete(l._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No recent lessons yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardLayout;
