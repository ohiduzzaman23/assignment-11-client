import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const ManageLessons = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch all lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/lessons`);
      return res.data;
    },
  });

  // Delete mutation
  const deleteLessonMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/lessons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lessons"]);
      toast.success("Lesson deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete lesson");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLessonMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Lessons</h1>

      {lessons.length ? (
        <table className="w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="border-b">
                <td className="p-3">{lesson.title}</td>
                <td className="p-3">
                  {lesson.author?.name || lesson.author || "Unknown"}
                </td>
                <td className="p-3">{lesson.status || "Public"}</td>
                <td className="p-3 flex gap-3">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded-xl"
                    onClick={() => navigate(`/edit-lesson/${lesson._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-xl"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No lessons found.</p>
      )}
    </div>
  );
};

export default ManageLessons;
