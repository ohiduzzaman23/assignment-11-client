import React from "react";
import Container from "../Shared/Container";
import experienceImg from "/images/experience.jpg";
import communityImg from "/images/community.jpg";
import emotionalImg from "/images/emotional.jpg";
import practicalImg from "/images/practical.jpg";

const LifeMatters = () => {
  return (
    <div className=" bg-[#FBFBF8] pb-15">
      <Container>
        <div className="p-15 text-center">
          <h1 className="text-4xl font-semibold my-4">
            Why Learning From Life Matters
          </h1>
          <p>
            The most valuable lessons aren't found in textbooks. They come from
            lived experiences, shared <br></br> openly to help others on their
            journey.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* CARD */}
          <div
            className="
    p-5 border rounded-2xl border-gray-300 bg-[#F7F6F2]
    transition-all duration-300 
    hover:border-[#F5DBB4] hover:bg-[#F7F4EC] hover:shadow-lg 
  "
          >
            <img src={experienceImg} alt="" className="w-12 h-12 " />

            <h2 className="text-xl font-semibold my-3">
              Learn from Experience
            </h2>

            <p className="text-gray-600">
              Real stories from real people who have navigated life’s challenges
              and emerged stronger.
            </p>
          </div>
          <div
            className="
    p-5 border rounded-2xl border-gray-300 bg-[#F7F6F2]
    transition-all duration-300 
    hover:border-[#F5DBB4] hover:bg-[#F7F4EC] hover:shadow-lg 
  "
          >
            <img src={communityImg} alt="" className="w-12 h-12" />

            <h2 className="text-xl font-semibold my-3">Community Wisdom</h2>

            <p className="text-gray-600">
              Tap into collective knowledge from a diverse community of lifelong
              learners.
            </p>
          </div>
          <div
            className="
    p-5 border rounded-2xl border-gray-300 bg-[#F7F6F2]
    transition-all duration-300 
    hover:border-[#F5DBB4] hover:bg-[#F7F4EC] hover:shadow-lg 
  "
          >
            <img src={emotionalImg} alt="" className="w-12 h-12" />

            <h2 className="text-xl font-semibold my-3">Emotional Connection</h2>

            <p className="text-gray-600">
              Find lessons that resonate with your journey and inspire
              meaningful change.
            </p>
          </div>
          <div
            className="
    p-5 border rounded-2xl border-gray-300 bg-[#F7F6F2]
    transition-all duration-300 
    hover:border-[#F5DBB4] hover:bg-[#F7F4EC] hover:shadow-lg 
  "
          >
            <img src={practicalImg} alt="" className="w-12 h-12" />

            <h2 className="text-xl font-semibold my-3">Practical Insights</h2>

            <p className="text-gray-600">
              Actionable wisdom you can apply immediately to improve your life.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LifeMatters;
