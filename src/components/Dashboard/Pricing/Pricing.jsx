import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Pricing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lessonId } = useParams();

  const handleUpgrade = () => {
    if (!lessonId) {
      toast.error("Please open a lesson first to upgrade!");
      return;
    }
    setIsOpen(true);
  };
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-gray-800">
      <div className="bg-gradient-to-b from-[#4a3622] to-[#6b5136] text-white py-20 text-center px-4">
        <h1 className="text-5xl font-bold">Invest in Your Growth</h1>
        <p className="opacity-90 max-w-2xl mx-auto mt-2">
          One-time payment. Lifetime access to all premium content.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto -mt-16 flex flex-col md:flex-row gap-6 px-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full md:w-1/2"
        >
          <h2 className="text-xl font-bold">Free</h2>
          <p className="text-3xl font-bold text-[#F49C35]">৳0</p>
          <p className="text-gray-500 mb-4">Forever</p>

          <ul className="space-y-3 text-gray-700 mb-6">
            {[
              "Access to free lessons",
              "Like, save & comment",
              "Share your lessons",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <Check className="text-green-600" size={18} /> {t}
              </li>
            ))}

            {["Premium lessons", "Ad-free experience"].map((t, i) => (
              <li key={i} className="flex gap-2 text-gray-400">
                <X className="text-red-500" size={18} /> {t}
              </li>
            ))}
          </ul>

          <button className="w-full bg-gray-200 py-2 rounded-lg text-gray-600">
            Current Plan
          </button>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full md:w-1/2 border-2 border-orange-300 relative"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F49C35] text-white px-4 py-1 text-xs rounded-full">
            Most Popular
          </div>

          <h2 className="text-xl font-bold">Premium</h2>
          <p className="text-3xl font-bold text-[#F49C35]">৳1500</p>
          <p className="text-gray-500 mb-6">One-time payment</p>

          <ul className="space-y-3 text-gray-700 mb-6">
            {[
              "Everything in Free",
              "Access to ALL premium lessons",
              "Ad-free experience",
              "Priority support",
              "Lifetime access",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <Check className="text-orange-500" size={18} /> {t}
              </li>
            ))}
          </ul>

          <Link
            to={lessonId ? `/payment/${lessonId}` : "#"}
            onClick={handleUpgrade}
            className="block w-full text-center py-3 bg-[#F49C35] text-white rounded-lg hover:bg-orange-500"
          >
            Upgrade Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
