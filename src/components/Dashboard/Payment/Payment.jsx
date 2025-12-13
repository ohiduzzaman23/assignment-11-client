import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Payment = () => {
  const { lessonId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: lesson } = useQuery({
    queryKey: ["lessons", lessonId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${lessonId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    if (!lesson) return;

    const paymentInfo = {
      cost: lesson.cost || 1,
      lessonId: lesson._id,
      senderEmail: "test@example.com",
      lessonTitle: lesson.title,
    };

    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to initiate payment. Try again.");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (!lesson) return <div className="p-6">Lesson not found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
      <p className="mb-6">{lesson.description}</p>
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-yellow-500 hover:bg-gradient-to-r from-[#F5A11B] to-[#F97516] text-white font-semibold rounded-2xl"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
