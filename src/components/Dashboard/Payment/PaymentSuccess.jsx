import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SuccessCelebration from "../../../assets/lottie/Success celebration.json";
import Lottie from "lottie-react";
import Container from "../../Shared/Container";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            lessonId: res.data.lessonId,
          });

          if (res.data.lessonId) {
            localStorage.setItem(`lesson-${res.data.lessonId}-unlocked`, true);
          }
        })
        .catch((err) => console.error("Payment success error:", err));
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen bg-[#f6f1e7] flex flex-col">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-10 mt-10">
          {/* Left: Payment Info */}
          <div className="flex-1">
            <h2 className="text-4xl font-semibold mb-4">Payment Successful!</h2>
            <p className="text-lg mb-2">
              Transaction ID:{" "}
              <span className="font-mono text-orange-500">
                {paymentInfo.transactionId || "Loading..."}
              </span>
            </p>
            <p className="text-lg">
              🏷 Parcel Tracking ID:{" "}
              <span className="font-mono text-orange-500">
                {paymentInfo.lessonId
                  ? `TRK-${paymentInfo.lessonId}`
                  : "Generating..."}
              </span>
            </p>
            <p className="mt-4 text-gray-600">
              You now have access to your premium lesson. Enjoy learning!
            </p>
          </div>

          {/* Right: Lottie Animation */}
          <div className="w-full max-w-md">
            <Lottie
              animationData={SuccessCelebration}
              loop={true}
              className="w-full h-80"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PaymentSuccess;
