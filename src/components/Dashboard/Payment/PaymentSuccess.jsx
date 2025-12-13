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

  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <Container>
        <div className="flex">
          <div className="mt-10">
            <h2 className="text-4xl">Payment successful</h2>
            <p>Your TransactionId: {paymentInfo.transactionId}</p>
            <p>Your Parcel Tracking id: {paymentInfo.trackingId}</p>
          </div>
          <div>
            {" "}
            <Lottie
              className="h-screen 0"
              animationData={SuccessCelebration}
              loop={true}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PaymentSuccess;
