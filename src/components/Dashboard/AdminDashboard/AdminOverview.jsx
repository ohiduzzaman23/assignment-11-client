import React from "react";

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Overview Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-2xl">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">1200</p>
        </div>

        <div className="p-6 bg-white shadow rounded-2xl">
          <h2 className="text-xl font-semibold">Total Lessons</h2>
          <p className="text-3xl font-bold mt-2">340</p>
        </div>

        <div className="p-6 bg-white shadow rounded-2xl">
          <h2 className="text-xl font-semibold">Reported Lessons</h2>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
