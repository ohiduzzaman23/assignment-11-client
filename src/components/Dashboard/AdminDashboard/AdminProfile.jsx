import React from "react";

const AdminProfile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Admin Profile</h1>

      <div className="p-6 bg-white shadow rounded-xl max-w-lg">
        <h2 className="text-xl font-semibold">Name: Admin</h2>
        <p className="mt-2 text-gray-600">Email: admin@example.com</p>

        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-xl">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
