import React from "react";

const ReportedLessons = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reported Lessons</h1>

      <div className="p-5 bg-white shadow rounded-xl">
        <h2 className="text-xl font-semibold">Lesson Title Example</h2>
        <p className="text-gray-600">Reason: Inappropriate content</p>
        <div className="mt-4 flex gap-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded-xl">
            Ignore
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-xl">
            Remove Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportedLessons;
