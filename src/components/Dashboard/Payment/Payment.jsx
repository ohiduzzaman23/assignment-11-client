import React from "react";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { lessonId } = useParams();

  return (
    <div>
      <h2>Please Pay</h2>
      <p>lesson ID: {lessonId}</p>
    </div>
  );
};

export default Payment;
