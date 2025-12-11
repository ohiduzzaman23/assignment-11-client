import React from "react";

const ManageLessons = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Lessons</h1>

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
          <tr>
            <td className="p-3">Life Lesson Example</td>
            <td className="p-3">Sobuj</td>
            <td className="p-3">Public</td>
            <td className="p-3 flex gap-3">
              <button className="px-3 py-1 bg-yellow-500 text-white rounded-xl">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded-xl">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageLessons;
