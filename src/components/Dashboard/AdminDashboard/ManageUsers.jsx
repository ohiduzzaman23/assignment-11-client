import React from "react";

const ManageUsers = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

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
          <tr>
            <td className="p-3">Sobuj</td>
            <td className="p-3">sobuj@example.com</td>
            <td className="p-3">User</td>
            <td className="p-3 flex gap-3">
              <button className="px-3 py-1 bg-blue-500 text-white rounded-xl">
                Make Admin
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded-xl">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
