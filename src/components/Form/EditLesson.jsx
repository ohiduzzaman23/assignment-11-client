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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-gray-800">
      <Container>
        <div className="px-6 py-12 max-w-2xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Edit Lesson</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={lesson.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Content / Description
              </label>
              <textarea
                name="content"
                value={lesson.content}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                rows={6}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Image URL</label>
              <input
                type="text"
                name="image"
                value={lesson.image}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
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
