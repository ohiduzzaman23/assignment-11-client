import React from "react";
import {
  BookOpen,
  Eye,
  Heart,
  Bookmark,
  PlusCircle,
  LayoutList,
  Star,
  Settings,
  ArrowRight,
} from "lucide-react";
import { FaCrown } from "react-icons/fa";
import { Link } from "react-router";
import Container from "../components/Shared/Container";

const stats = [
  { icon: BookOpen, label: "Lessons Created", value: 5 },
  { icon: Eye, label: "Total Views", value: "2,345" },
  { icon: Heart, label: "Total Likes", value: 189 },
  { icon: Bookmark, label: "Total Saves", value: 67 },
];

const quickActions = [
  {
    icon: PlusCircle,
    title: "Add New Lesson",
    desc: "Share your wisdom with the community",
  },
  {
    icon: LayoutList,
    title: "My Lessons",
    desc: "Manage your created lessons",
  },
  { icon: Bookmark, title: "Favorites", desc: "View your saved lessons" },
  {
    icon: Settings,
    title: "Profile Settings",
    desc: "Update your account details",
  },
];

const recentLessons = [
  {
    title: "The Power of Saying No: Protecting Your Energy",
    desc: "Learning to set boundaries changed my life. This lesson explores how saying no to others can mean saying yes to yourself.",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=60",
    views: 1205,
    likes: 234,
    comments: 89,
  },
  {
    title: "Embracing Failure as a Teacher",
    desc: "My biggest failures taught me more than any success ever could. Here is what I learned from hitting rock bottom.",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=60",
    views: 2341,
    likes: 456,
    comments: 178,
  },
  {
    title: "Finding Peace in Uncertainty",
    desc: "When everything feels chaotic, here is how I found my center and learned to embrace the unknown.",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=60",
    views: 1567,
    likes: 312,
    comments: 145,
  },
];

const DashboardLayout = ({ userName = "Demo User" }) => {
  return (
    <div className="min-h-screen bg-[#f7f4ee] text-gray-800">
      <Container>
        <div className="px-6 py-12">
          {/* Top bar */}
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
              <Link
                to="/pricing"
                className="px-4 py-2 bg-gradient-to-r from-[#F5A11B] to-[#F97516] text-white rounded-xl shadow-md
  hover:from-[#F59E0B] hover:to-[#F97316] hover:scale-105 transition-all duration-300"
              >
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

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Left: Quick Actions */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

              <div className="space-y-4">
                {quickActions.map((qa, idx) => {
                  const Icon = qa.icon;
                  return (
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

            {/* Right: Recent Lessons (span 2 cols) */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Your Recent Lessons</h3>
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  View All →
                </a>
              </div>

              <div className="space-y-4">
                {recentLessons.map((l, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center"
                  >
                    <img
                      src={l.img}
                      alt={l.title}
                      className="w-36 h-20 object-cover rounded-md flex-shrink-0"
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{l.title}</h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {l.desc}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                        <div className="flex items-center gap-1">
                          <Eye size={14} /> {l.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart size={14} /> {l.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Bookmark size={14} /> {l.comments}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default DashboardLayout;
