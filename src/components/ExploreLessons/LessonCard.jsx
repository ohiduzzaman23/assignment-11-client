import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, MessageCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const LessonCard = ({ lesson }) => {
  const titleRef = useRef(null);
  const [lineClamp, setLineClamp] = useState(2);

  useEffect(() => {
    if (titleRef.current) {
      const isSingleLine =
        titleRef.current.scrollHeight <= titleRef.current.clientHeight;
      setLineClamp(isSingleLine ? 3 : 2);
    }
  }, [lesson?.title]);

  if (!lesson?._id) return null;

  return (
    <Link to={`/lessons/${lesson._id}`}>
      <motion.div
        className="bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden cursor-pointer h-[360px]"
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={lesson.image || "/mountain.jpg"}
            className={`w-full h-full object-cover transition-all duration-300 ${
              lesson.premiumOnly ? "blur-sm brightness-85" : ""
            }`}
            alt={lesson.title || "Lesson Image"}
          />

          <span
            className={`absolute top-3 left-3 text-sm px-3 py-1 rounded-full shadow transition-all duration-300 ${
              lesson.premiumOnly
                ? "blur-sm brightness-75 bg-white/70"
                : "bg-white"
            }`}
          >
            {lesson.tone || "General"}
          </span>

          {lesson.premiumOnly && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 px-4 py-2 rounded-full flex items-center gap-2 text-sm shadow-lg">
                <Lock size={16} /> Premium Only
              </div>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col justify-between h-[132px]">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              {lesson.category || "General"}
            </p>

            <h3
              ref={titleRef}
              className="font-semibold text-lg mb-2 line-clamp-1"
            >
              {lesson.title || "Untitled Lesson"}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {lesson.description || "No description available."}
            </p>
          </div>

          <div className="flex items-center justify-between text-gray-500 text-sm">
            {/* Author */}
            <span>
              👤 {lesson.author?.name || lesson.author || "Anonymous"}
            </span>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Heart size={14} /> {lesson.likes || 0}
              </span>

              <span className="flex items-center gap-1">
                <MessageCircle size={14} />{" "}
                {Array.isArray(lesson.comments) ? lesson.comments.length : 0}
              </span>

              <span className="flex items-center gap-1">
                <Eye size={14} /> {lesson.views || 0}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default LessonCard;
