import React, { useEffect, useState } from "react";
import { Eye, Heart, Bookmark, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../components/Shared/Container";

const MyLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/lessons?userEmail=demo@example.com`)
      .then((res) => setLessons(res.data))
      .catch((err) => console.error("Failed to fetch lessons:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/lessons/${id}`);
      setLessons((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Failed to delete lesson:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-gray-800">
      <Container>
        <div className="px-6 py-12">
          <h1 className="text-3xl font-semibold mb-2">My Lessons</h1>
          <p className="text-gray-600 mb-6">
            Manage and track your shared life lessons
          </p>

          {lessons.length === 0 ? (
            <p className="text-gray-500">
              You haven't created any lessons yet.
            </p>
          ) : (
            <div className="space-y-4">
              {lessons.map((l) => (
                <div
                  key={l._id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center relative"
                >
                  <img
                    src={l.image || "/mountain.jpg"}
                    alt={l.title}
                    className="w-36 h-20 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{l.title}</h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {l.content || l.desc || "No description"}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                      <div className="flex items-center gap-1">
                        <Eye size={14} /> {l.views || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={14} /> {l.likes || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Bookmark size={14} /> {l.comments?.length || 0}
                      </div>
                    </div>
                  </div>

                  {/* 3-dot */}
                  <div className="relative">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={() =>
                        setMenuOpen(menuOpen === l._id ? null : l._id)
                      }
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {menuOpen === l._id && (
                      <div className="absolute right-0 top-8 bg-white shadow-lg border border-gray-200 rounded-md w-32 z-10">
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => navigate(`/edit-lesson/${l._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                          onClick={() => handleDelete(l._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default MyLessons;
