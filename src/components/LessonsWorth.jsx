import React from "react";
import { GoArrowRight } from "react-icons/go";
import Container from "./Shared/Container";

const lessons = [
  {
    id: 1,
    rank: "01",
    category: "Health & Wellness",
    title: "The Healing Power of Gratitude",
    desc: "How a simple daily practice changed my perspective and helped me overcome depression.",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800",
    saves: 312,
    likes: 678,
    views: 3245,
    author: "Emma Williams",
    authorImg: "https://i.pravatar.cc/60?img=7",
  },
  {
    id: 2,
    rank: "02",
    category: "Finance & Money",
    title: "Building Wealth Through Patience",
    desc: "The most valuable financial lesson I ever learned had nothing to do with money — it was about time.",
    image:
      "https://images.unsplash.com/photo-1518544887879-47c4b2c6d4d2?q=80&w=800",
    saves: 234,
    likes: 523,
    views: 2890,
    author: "Sarah Johnson",
    authorImg: "https://i.pravatar.cc/60?img=12",
  },
  {
    id: 3,
    rank: "03",
    category: "Wealth Through",
    title: "Building Wealth Through Patience",
    desc: "The most valuable financial lesson I ever learned had nothing to do with money — it was about time.",
    image:
      "https://images.unsplash.com/photo-1518544887879-47c4b2c6d4d2?q=80&w=800",
    saves: 234,
    likes: 523,
    views: 2890,
    author: "Sarah Johnson",
    authorImg: "https://i.pravatar.cc/60?img=12",
  },
];

const LessonsWorth = () => {
  return (
    <section className="bg-[#FBFBF8] py-20 px-6">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-amber-600 font-medium text-sm mb-3">
                🔖MOST SAVED
              </div>
              <h2 className="text-4xl font-serif font-semibold text-slate-800 mb-3">
                Lessons Worth Keeping
              </h2>
              <p className="text-slate-600 max-w-xl">
                These lessons have been saved by the most readers. Timeless
                wisdom that keeps resonating.
              </p>
            </div>

            {/* BUTTON */}
            <button className="btn rounded-2xl flex items-center gap-2 group ">
              See All Saved
              <GoArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* LIST */}
          <div className="space-y-6">
            {lessons.map((item) => (
              <div
                key={item.id}
                className="bg-[#F7F6F2] backdrop-blur border border-gray-300 rounded-2xl p-6 flex flex-col lg:flex-row items-center gap-6 hover:shadow-md transition"
              >
                {/* Left Rank */}
                <div className="text-3xl font-bold text-amber-500 w-16 text-center">
                  {item.rank}
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
                    {item.category}
                  </p>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">{item.desc}</p>

                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500">
                    <span>🔖 {item.saves} saves</span>
                    <span>❤️ {item.likes} likes</span>
                    <span>👁 {item.views} views</span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 shrink-0">
                  <img
                    src={item.authorImg}
                    alt={item.author}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-slate-800">{item.author}</p>
                    <p className="text-xs text-slate-500">Author</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LessonsWorth;
