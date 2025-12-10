import React from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Unlimited Access",
    desc: "Read every lesson without restrictions. No more locked content.",
    img: "/images/experience.jpg",
  },
  {
    title: "Lifetime Access",
    desc: "Pay once, access forever. No recurring subscriptions.",
    img: "/images/lifetime.jpg",
  },
  {
    title: "Ad-Free Experience",
    desc: "Focus on learning without distractions or interruptions.",
    img: "/images/adFree.jpg",
  },
  {
    title: "Support Creators",
    desc: "Your purchase helps fund quality content creation.",
    img: "/images/emotional.jpg",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen w-full bg-[#f7f5ef] text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#4a3622] to-[#6b5136] text-white py-20 text-center px-4 mb-8">
        <div className="inline-block bg-white/20 text-white px-4 py-1 rounded-full mb-4 text-sm">
          Simple, transparent pricing
        </div>
        <h1 className="text-5xl font-bold mb-4">Invest in Your Growth</h1>
        <p className="opacity-90 max-w-2xl mx-auto w-125">
          One-time payment. Lifetime access. Unlock all premium lessons and
          transform your learning experience.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto mt-[-80px] flex flex-col md:flex-row gap-6 justify-center px-4">
        {/* Free Plan */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white text-center shadow-xl rounded-2xl p-8 w-full md:w-1/2 border border-gray-200"
        >
          <h2 className="text-xl font-bold mb-2">Free</h2>
          <p className="text-3xl font-bold text-[#F49C35] mb-1">৳0</p>
          <p className="text-gray-500 mb-6">Forever</p>

          <ul className="space-y-3 mb-8">
            {/* Free features (Check icon) */}
            {[
              "Access to free public lessons",
              "Like and comment on lessons",
              "Save lessons to favorites",
              "Create and share your lessons",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <Check className="text-green-600" size={18} /> {item}
              </li>
            ))}

            {/* Not included features → X icon */}
            {["Premium lessons", "Ad-free experience", "Priority support"].map(
              (item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-400">
                  <X className="text-red-500" size={18} /> {item}
                </li>
              )
            )}
          </ul>

          <button className="w-full py-2 rounded-lg bg-gray-200 text-gray-600 cursor-default">
            Current Plan
          </button>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white text-center shadow-xl rounded-2xl p-8 w-full md:w-1/2 border-2 border-orange-300 relative"
        >
          {/* Center Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F49C35] text-white px-4 py-1 text-xs rounded-full shadow-md">
            Most Popular
          </div>

          <h2 className="text-xl font-bold mb-2">Premium</h2>
          <p className="text-3xl font-bold text-[#F49C35] mb-1">৳1500</p>
          <p className="text-gray-500 mb-6">One-time payment</p>

          <ul className="space-y-3 mb-8 text-gray-700">
            {[
              "Everything in Free",
              "Access to ALL premium lessons",
              "Ad‑free experience",
              "Priority support",
              "Early access to new features",
              "Premium badge on profile",
              "Lifetime access",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="text-orange-500" size={18} /> {item}
              </li>
            ))}
          </ul>

          <button className="w-full py-3 my-g-btn">Upgrade Now</button>
        </motion.div>
      </div>

      {/* Why Go Premium */}
      <div className="text-center mt-20 px-4">
        <h2 className="text-2xl font-bold mb-3">Why Go Premium?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Premium unlocks the full potential of your learning journey with
          exclusive benefits designed to maximize your growth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-xl p-6 text-center"
            >
              <div className="w-14 mx-auto mb-3">
                <img src={item.img} alt={item.title} />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto mt-20 px-4 pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            "Is it really a one‑time payment?",
            "What payment methods do you accept?",
            "Can I get a refund?",
            "Will I get access to future premium content?",
          ].map((q, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-lg shadow border border-gray-200"
            >
              <p className="font-semibold mb-2">{q}</p>
              <p className="text-gray-600 text-sm">
                {i === 0 &&
                  "Yes! Pay once and get lifetime access to all premium features. No subscriptions, no hidden fees."}
                {i === 1 &&
                  "We accept all major cards, mobile banking, and debit/credit payments."}
                {i === 2 &&
                  "We offer a 7‑day refund guarantee. If you're not satisfied, contact us for a full refund."}
                {i === 3 &&
                  "Absolutely! Lifetime access includes all current and future premium lessons."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Pricing;
