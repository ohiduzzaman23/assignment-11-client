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
    <Link to={`/lessons/${lesson._id}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="
          bg-white rounded-2xl overflow-hidden
          shadow-md hover:shadow-xl
          transition h-full flex flex-col
        "
      >
        {/* IMAGE */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img
            src={lesson.image || "/mountain.jpg"}
            alt={lesson.title || "Lesson Image"}
            className={`w-full h-full object-cover transition duration-300 ${
              lesson.premiumOnly ? "blur-sm brightness-90" : ""
            }`}
          />

          {/* Tone Badge */}
          <span
            className={`absolute top-3 left-3 text-xs sm:text-sm px-3 py-1 rounded-full shadow
              ${lesson.premiumOnly ? "bg-white/70 blur-[1px]" : "bg-white"}`}
          >
            {lesson.tone || "General"}
          </span>

          {/* Premium Overlay */}
          {lesson.premiumOnly && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 px-4 py-2 rounded-full flex items-center gap-2 text-sm shadow">
                <Lock size={16} /> Premium Only
              </div>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col flex-1">
          {/* Text */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">
              {lesson.category || "General"}
            </p>

            <h3
              ref={titleRef}
              className={`font-semibold text-base sm:text-lg mb-2 line-clamp-${lineClamp}`}
            >
              {lesson.title || "Untitled Lesson"}
            </h3>

            <p className="text-gray-600 text-sm line-clamp-2">
              {lesson.description || "No description available."}
            </p>
          </div>

          {/* META */}
          <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-gray-500 text-xs sm:text-sm">
            {/* Author */}
            <span className="truncate">
              👤 {lesson.author?.name || lesson.author || "Anonymous"}
            </span>

            {/* Stats */}
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
