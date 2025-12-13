import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const ReportedLessons = () => {
  const queryClient = useQueryClient();

  // Fetch all lessons
  const {
    data: reportedLessons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/lessons`);
      // Filter lessons that have reports
      return res.data.filter(
        (lesson) => lesson.reports && lesson.reports.length > 0
      );
    },
  });

  // Delete mutation
  const deleteLessonMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/lessons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reported-lessons"]);
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
  if (isError)
    return <p className="text-red-500">Failed to load reported lessons.</p>;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Reported Lessons</h1>

      {reportedLessons.length ? (
        <table className="w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Reported By</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportedLessons.map((lesson) =>
              lesson.reports.map((r, index) => (
                <tr key={lesson._id + "-" + index} className="border-b">
                  <td className="p-3">{lesson.title}</td>

                  <td className="p-3">{lesson.author || "Unknown"}</td>
                  <td className="p-3">{r.reason || "No reason"}</td>
                  <td className="p-3">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-xl"
                      onClick={() => handleDelete(lesson._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">No reported lessons found.</p>
      )}
    </div>
  );
};

export default ReportedLessons;
