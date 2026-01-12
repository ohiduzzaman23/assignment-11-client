import React from "react";
import { motion } from "framer-motion";

const Card = ({
  image = "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  tag = "Mindfulness",
  title = "Finding Peace in Uncertainty",
  excerpt = "When everything feels chaotic, here is how I found my center and learned to embrace the unknown.",
  author = "Emma Williams",
  authorImg = "https://i.pravatar.cc/40?img=7",
  likes = 312,
  comments = 145,
  views = 1567,
  premium = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      style={{ minHeight: 410 }}
    >
      {/* Image Section */}
      <div className="relative h-44">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Tag */}
        <span className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-slate-700 shadow">
          {tag}
        </span>

        {/* Premium Overlay */}
        {premium && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm font-semibold">Premium Only</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-slate-500 mb-4 line-clamp-3">{excerpt}</p>

        {/* Author + Stats */}
        <div className="flex items-center justify-between mt-4 ">
          <div className="flex items-center gap-3 ">
            <img
              src={authorImg}
              alt={author}
              className="h-8 w-8 rounded-full"
            />
            <div className="text-sm">
              <p className="font-medium text-slate-800">{author}</p>
              <p className="text-xs text-slate-500">{tag}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>❤️ {likes}</span>
            <span>💬 {comments}</span>
            <span>👁 {views}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
