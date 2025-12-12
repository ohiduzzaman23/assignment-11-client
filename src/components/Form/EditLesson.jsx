import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../Shared/Container";

const EditLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState({
    title: "",
    content: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/lessons/${id}`)
      .then((res) => {
        setLesson({
          title: res.data.title || "",
          content: res.data.content || res.data.desc || "",
          image: res.data.image || "",
        });
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/lessons/${id}`, lesson);
      alert("Lesson updated successfully!");
      navigate("/my-lessons");
    } catch (err) {
      console.error(err);
      alert("Failed to update lesson.");
    }
  };

  if (loading) return <p className="text-center py-20 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-gray-800 py-16">
      <Container>
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl max-w-2xl mx-auto p-10 border border-gray-200">
          <h1 className="text-4xl font-bold mb-8 text-center">Edit Lesson</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Lesson Title
              </label>
              <input
                type="text"
                name="title"
                value={lesson.title}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-lg p-3 transition"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Content / Description
              </label>
              <textarea
                name="content"
                value={lesson.content}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-lg p-3 transition"
                rows={6}
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Cover Image URL
              </label>
              <input
                type="text"
                name="image"
                value={lesson.image}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-lg p-3 transition"
              />

              {lesson.image && (
                <img
                  src={lesson.image}
                  alt="Preview"
                  className="mt-4 w-full h-52 object-cover rounded-xl shadow-md"
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white rounded-xl transition 
              bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg"
            >
              Update Lesson
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default EditLesson;
