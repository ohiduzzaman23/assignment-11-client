import React from "react";
import { Search, Heart, MessageCircle, Eye, Lock } from "lucide-react";
import Container from "../../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import LessonCard from "../../ExploreLessons/LessonCard";

const ExploreLessons = () => {
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/lessons`);
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen w-full bg-[#f7f5ef]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#4a3622] to-[#6b5136] text-white py-16 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Explore Life Lessons</h1>
        <p className="opacity-90 max-w-2xl mx-auto">
          Discover wisdom from real experiences. Browse through hundreds of
          lessons shared by lifelong learners.
        </p>
      </div>

      {/* Search + Filters */}
      <Container>
        <div className="px-4">
          <div className="bg-white shadow-2xl rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center w-full md:flex-1 border border-gray-300 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search lessons..."
                className="w-full ml-2 focus:outline-none"
              />
            </div>

            <select className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto">
              <option>All Categories</option>
              <option>Personal Growth</option>
              <option>Relationships</option>
              <option>Career & Work</option>
              <option>Health & Wellness</option>
              <option>Finance & Money</option>
              <option>Mindfulness</option>
              <option>Creativity</option>
              <option>Resilience</option>
              <option>Leadership</option>
              <option>Other</option>
            </select>

            <select className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto">
              <option>All Tones</option>
              <option>Inspiring</option>
              <option>Reflective</option>
              <option>Hopeful</option>
              <option>Grateful</option>
              <option>Empowering</option>
              <option>Peaceful</option>
              <option>Motivating</option>
            </select>

            <select className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Most Liked</option>
              <option>Most Saved</option>
              <option>Most Viewed</option>
            </select>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-16">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </Container>
    </div>
  );
};
export default ExploreLessons;
