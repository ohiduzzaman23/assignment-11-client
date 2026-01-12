import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleMakeAdmin = async () => {
    try {
      const res = await axiosSecure.patch(`/users/${user._id}/update-role`, {
        role: "admin",
      });
      if (res.data.success) {
        toast.success("User promoted to admin!");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role!");
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await axiosSecure.delete(`/users/${user._id}`);
      toast.success("User deleted!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user!");
    }
  };

  return (
    <tr>
      <td className="px-5 py-3 border-b border-gray-200">
        {user.name || user.displayName || "No Name"}
      </td>
      <td className="px-5 py-3 border-b border-gray-200">{user.email}</td>
      <td className="px-5 py-3 border-b border-gray-200">
        {user.role || "user"}
      </td>
      <td className="px-5 py-3 border-b border-gray-200 flex gap-2">
        {user.role !== "admin" && (
          <button
            onClick={handleMakeAdmin}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Make Admin
          </button>
        )}
        <button
          onClick={handleDeleteUser}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserDataRow;
