import React from "react";
import { FaCrown } from "react-icons/fa";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MeetOurSharers = () => {
  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["contributors"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/contributors`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading contributors...</p>;

  const maxLessons = Math.max(...contributors.map((c) => c.lessons || 0));
  return (
    <section className="py-20 bg-[#FAF8F4]">
      <Container>
        <div className="grid md:grid-cols-2 gap-12">
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
            <div className="grid grid-cols-3 mt-10">
              <div className="text-center">
                <h2 className="text-[#F49F32] text-3xl font-semibold">500+</h2>
                <p>Lessons Shared</p>
              </div>
              <div className="text-center">
                <h2 className="text-[#F49F32] text-3xl font-semibold">50K+</h2>
                <p>Lives Touched</p>
              </div>
              <div className="text-center">
                <h2 className="text-[#F49F32] text-3xl font-semibold">100+</h2>
                <p>Contributors</p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col gap-5">
            {contributors
              .sort((a, b) => b.lessons - a.lessons)
              .map((person, index) => {
                const isTop = person.lessons === maxLessons;
                return (
                  <div
                    key={person._id || index}
                    className={`flex items-center justify-between bg-[#FBFBF8] rounded-xl shadow-sm p-5
                      border ${
                        isTop ? "border-[#F5A623] shadow-md" : "border-gray-200"
                      }`}
                  >
                    {/* Left */}
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <span
                        className={`w-10 h-10 flex items-center justify-center text-gray-500 font-semibold rounded-full 
                          ${isTop ? "bg-[#F5A623]" : "bg-[#EEEBE8]"}`}
                      >
                        #{index + 1}
                      </span>

                      {/* Avatar */}
                      <img
                        src={person.avatar || "/images/default.jpg"}
                        className="w-12 h-12 rounded-full object-cover"
                        alt={person.name}
                      />

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="font-semibold">{person.name}</h4>
                          {isTop && (
                            <FaCrown className="text-[#F5A623] text-sm" />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">
                          ♢ {person.lessons} lessons shared
                        </p>
                      </div>
                    </div>

                    {/* Right Side Badge */}
                    {isTop && (
                      <span className="bg-[#F5A623] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Top Contributor
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MeetOurSharers;
