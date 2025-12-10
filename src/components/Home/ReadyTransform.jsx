import { Button } from "@headlessui/react";
import React from "react";
import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";

const ReadyTransform = () => {
  return (
    <div className="w-full bg-gradient-to-br from-[#6b4f3b] via-[#4a372b] to-[#3c2e25] flex flex-col items-center justify-center text-white px-4 p-15">
      <div className="text-center max-w-3xl mx-auto">
        <button className="mb-6 px-4 py-2 bg-yellow-600/80 hover:bg-yellow-600 rounded-full text-sm font-medium shadow-lg">
          <FaCrown className="inline" /> Unlock Premium Access
        </button>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Ready to Transform Your Life?
        </h1>

        <p className="text-base md:text-lg text-white/80 mb-10">
          Join thousands of learners who have unlocked premium lessons. Get
          unlimited access to all wisdom, exclusive content, and more.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
          <Link
            to="/pricing"
            className="
        bg-gradient-to-r from-[#F5A11B] to-[#F97516]
        hover:from-[#F97516] hover:to-[#F5A11B]
        text-white px-8 py-3 rounded-xl text-lg shadow-xl
        "
          >
            Upgrade to Premium →
          </Link>
          <Link
            to="/explore-lessons"
            className="bg-gradient-to-br from-yellow-200 to-orange-300 text-black px-8 py-3 rounded-xl text-lg shadow-xl font-semibold"
          >
            Browse Free Lessons
          </Link>
        </div>

        <div className="flex items-center justify-center gap-10 text-lg font-semibold">
          <div className="text-center">
            <span className="text-2xl">৳1500</span>
            <p className="text-sm text-white/70">One-time payment</p>
          </div>

          <div className="h-10 w-px bg-white/30"></div>

          <div className="text-center">
            <span className="text-2xl">Lifetime</span>
            <p className="text-sm text-white/70">Access</p>
          </div>

          <div className="h-10 w-px bg-white/30"></div>

          <div className="text-center">
            <span className="text-2xl">100%</span>
            <p className="text-sm text-white/70">Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyTransform;
