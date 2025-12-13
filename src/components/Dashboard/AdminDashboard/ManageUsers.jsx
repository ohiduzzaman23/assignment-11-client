import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const ManageUsers = () => {
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      return res.data;
    },
  });

  // Make Admin Mutation
  const makeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/make-admin`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User promoted to admin!");
    },
    onError: () => {
      toast.error("Failed to make admin");
    },
  });

  // Delete User Mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete user");
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
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3">{user.name || "Unknown"}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role || "User"}</td>
                <td className="p-3 flex gap-3">
                  {user.role !== "admin" && (
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-xl"
                      onClick={() => makeAdminMutation.mutate(user._id)}
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-xl"
                    onClick={() => deleteUserMutation.mutate(user._id)}
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
