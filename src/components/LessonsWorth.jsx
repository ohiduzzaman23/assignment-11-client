import React from "react";
import { GoArrowRight } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "./Shared/Container";
import { Link } from "react-router-dom";

const LessonsWorth = () => {
  // top saved lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lessons-worth"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/lessons-worth`
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  const sortedLessons = [...lessons].sort(
    (a, b) => (b.saves || 0) - (a.saves || 0)
  );
  sortedLessons.forEach((lesson, index) => {
    lesson.rank = (index + 1).toString().padStart(2, "0");
  });

  return (
    <section className="bg-[#FBFBF8] py-20">
      <Container>
        <div className="">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-amber-600 font-medium text-sm mb-3">
                🔖 MOST SAVED
              </div>
              <h2 className="text-4xl font-serif font-semibold text-slate-800 mb-3">
                Lessons Worth Keeping
              </h2>
              <p className="text-slate-600 max-w-xl">
                These lessons have been saved by the most readers. Timeless
                wisdom that keeps resonating.
              </p>
            </div>

            {/* button */}
            <button className="btn rounded-2xl flex items-center gap-2 group">
              See All Saved
              <GoArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Lesson list */}
          <div className="space-y-6">
            {sortedLessons.map((item) => (
              <Link
                to={`/lessons/${item._id}`}
                key={item._id}
                className="bg-[#F7F6F2] border border-gray-300 rounded-2xl p-6 flex flex-col lg:flex-row items-center gap-6 hover:shadow-md transition"
              >
                {/* Left Rank */}
                <div className="text-3xl font-bold text-amber-500 w-16 text-center">
                  {item.rank || "-"}
                </div>

                {/* Image */}
                <div className="w-full lg:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-xs text-amber-600 font-semibold mb-1 uppercase">
                    {item.category || "General"}
                  </p>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {item.description || ""}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500">
                    <span>🔖 {item.saves || 0} saves</span>
                    <span>❤️ {item.likes || 0} likes</span>
                    <span>👁 {item.views || 0} views</span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 shrink-0">
                  <img
                    src={item.authorAvatar || "https://i.pravatar.cc/60"}
                    alt={item.author || "Author"}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-slate-800">
                      {item.author || "Unknown"}
                    </p>
                    <p className="text-xs text-slate-500">Author</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LessonsWorth;
