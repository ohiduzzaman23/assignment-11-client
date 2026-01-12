import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentCancelled = () => {
  const { lessonId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleTryAgain = async () => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        lessonId,
      });

      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert("Unable to start payment");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">
        Payment was cancelled. Please try again.
      </h2>

      <button onClick={handleTryAgain} className="btn btn-primary text-black">
        Try Again
      </button>
    </div>
  );
};

export default PaymentCancelled;
