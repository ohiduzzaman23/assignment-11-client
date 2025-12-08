import React from "react";
import { FaCrown } from "react-icons/fa";
import Container from "../Shared/Container";

const contributors = [
  {
    rank: "#1",
    name: "Sarah Johnson",
    lessons: 12,
    badge: "Top Contributor",
    avatar: "/images/user1.jpg",
    highlight: true,
  },
  {
    rank: "#2",
    name: "Michael Chen",
    lessons: 9,
    avatar: "/images/user2.jpg",
  },
  {
    rank: "#3",
    name: "Emma Williams",
    lessons: 7,
    avatar: "/images/user3.jpg",
  },
  {
    rank: "#4",
    name: "David Park",
    lessons: 5,
    avatar: "/images/user4.jpg",
  },
];

const MeetOurSharers = () => {
  return (
    <section className="py-20 bg-[#FAF8F4]">
      <Container>
        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT SIDE (Heading + Stats) */}
          <div>
            <p className="text-sm text-[#D2922E] font-semibold flex items-center gap-2">
              <span>🏆</span> TOP CONTRIBUTORS
            </p>

            <h2 className="text-4xl font-bold mt-2 text-gray-900">
              Meet Our Wisdom Sharers
            </h2>

            <p className="text-gray-600 mt-4">
              These amazing individuals have shared the most valuable lessons,
              helping thousands of people grow and learn from their experiences.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-10">
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <h3 className="text-3xl font-bold text-[#D2922E]">500+</h3>
                <p className="text-gray-600 text-sm mt-1">Lessons Shared</p>
              </div>

              <div className="bg-white rounded-xl shadow p-6 text-center">
                <h3 className="text-3xl font-bold text-[#D2922E]">50K+</h3>
                <p className="text-gray-600 text-sm mt-1">Lives Touched</p>
              </div>

              <div className="bg-white rounded-xl shadow p-6 text-center">
                <h3 className="text-3xl font-bold text-[#D2922E]">100+</h3>
                <p className="text-gray-600 text-sm mt-1">Contributors</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-5">
            {contributors.map((person, index) => (
              <div
                key={index}
                className={`flex items-center justify-between bg-[#FBFBF8] rounded-xl shadow-sm p-5
                border ${
                  person.highlight
                    ? "border-[#F5A623] shadow-md"
                    : "border-gray-200"
                }`}
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <span
                    className={`w-10 h-10 flex items-center justify-center text-gray-500 font-semibold rounded-full 
                    ${person.highlight ? "bg-[#F5A623]" : "bg-[#EEEBE8]"}`}
                  >
                    {person.rank}
                  </span>

                  {/* Avatar */}
                  <img
                    src={person.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                    alt="avatar"
                  />

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-semibold">{person.name}</h4>
                      <FaCrown className="text-[#F5A623] text-sm" />
                    </div>

                    <p className="text-gray-600 text-sm">
                      ♢ {person.lessons} lessons shared
                    </p>
                  </div>
                </div>

                {/* Right Side Badge */}
                {person.badge && (
                  <span className="bg-[#F5A623] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {person.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MeetOurSharers;
