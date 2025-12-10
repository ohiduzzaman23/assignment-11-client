import React, { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../../components/Shared/Container";
import LessonCard from "../../components/ExploreLessons/LessonCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const ExploreLessons = () => {
  // --- Filter & search states ---
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [tone, setTone] = useState("All Tones");
  const [sort, setSort] = useState("Newest");

  // --- Fetch lessons ---
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/lessons`);
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  // --- Filter & sort ---
  const filteredLessons = lessons
    // Search by title
    .filter((lesson) =>
      lesson.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // Filter by category (tags array)
    .filter((lesson) =>
      category === "All Categories" ? true : lesson.tags?.includes(category)
    )
    // Filter by tone
    .filter((lesson) => (tone === "All Tones" ? true : lesson.tone === tone))
    // Sort lessons
    .sort((a, b) => {
      if (sort === "Newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "Oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === "Most Popular") return (b.likes || 0) - (a.likes || 0);
      return 0;
    });
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

      {/* Search & Filters */}
      <Container>
        <div className="px-4">
          <div className="bg-white shadow-2xl rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="flex items-center w-full md:flex-1 border border-gray-300 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search lessons..."
                className="w-full ml-2 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto"
            >
              <option>All Categories</option>
              <option>General</option>
              <option>Personal Growth</option>
              <option>Career</option>
              <option>Relationships</option>
            </select>

            {/* Tone Filter */}
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto"
            >
              <option>All Tones</option>
              <option>Inspirational</option>
              <option>Humorous</option>
              <option>Serious</option>
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto"
            >
              <option>Newest</option>
              <option>Oldest</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-16">
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 mt-10">
              No lessons found.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ExploreLessons;
