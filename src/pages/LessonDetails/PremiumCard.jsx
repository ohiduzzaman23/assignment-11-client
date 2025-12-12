import React from "react";
import { Lock } from "lucide-react";
import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";

const PremiumCard = ({ id }) => {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
        <div className="bg-white shadow-2xl p-10 rounded-2xl text-center max-w-md">
          <Lock className="w-12 h-12 mx-auto text-gray-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Premium Content</h2>
          <p className="text-gray-600 mb-6">
            This lesson is available exclusively for premium members. Upgrade to
            unlock all premium content.
          </p>
          <Link
            to={`/pricing/${id}`}
            className="px-6 py-3 bg-yellow-500 text-white rounded-2xl font-medium hover:bg-yellow-600 transition"
          >
            <FaCrown className="inline" /> Upgrade to Premium
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PremiumCard;
