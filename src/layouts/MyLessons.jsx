import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const [users, setUsers] = useState([]);

  // Fetch all lessons and map users
  const { isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/lessons`);
      const lessons = res.data;

      const userMap = {};
      lessons.forEach((lesson) => {
        const name = lesson.author || "Anonymous";
        const email = lesson.authorEmail || name;

        if (userMap[email]) {
          userMap[email].lessons++;
        } else {
          userMap[email] = {
            name,
            email,
            lessons: 1,
            role: "User", // default role
            _id: email, // use email as unique key
          };
        }
      });

      const mappedUsers = Object.values(userMap);
      setUsers(mappedUsers); // set local state
      return mappedUsers;
    },
  });

  // Make Admin Mutation
  const makeAdminMutation = useMutation({
    mutationFn: async (userEmail) => {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userEmail}/make-admin`
      );
    },
    onSuccess: (_, userEmail) => {
      setUsers((prev) =>
        prev.map((u) => (u.email === userEmail ? { ...u, role: "admin" } : u))
      );
      toast.success("User promoted to admin!");
    },
    onError: () => {
      toast.error("Failed to make admin");
    },
  });

  // Delete User Mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userEmail) => {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/lessons/by-author/${userEmail}`
      );
    },
    onSuccess: (_, userEmail) => {
      setUsers((prev) => prev.filter((u) => u.email !== userEmail));
      toast.success("All lessons by user deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete user lessons");
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {users.length ? (
        <table className="w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Lessons Created</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.lessons}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3 flex gap-3">
                  {user.role !== "admin" && (
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-xl"
                      onClick={() => makeAdminMutation.mutate(user.email)}
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-xl"
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        `Are you sure you want to delete ${user.name}?`
                      );
                      if (confirmDelete) deleteUserMutation.mutate(user.email);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default ManageUsers;
