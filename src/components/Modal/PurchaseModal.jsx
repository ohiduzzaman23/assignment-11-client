import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const PurchaseModal = ({ closeModal, isOpen, product }) => {
  const { user } = useAuth();

  if (!product) return null;

  const { _id, name, category, price, description, image, seller } = product;

  const handlePayment = async () => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    let imageUrl = image;
    if (imageUrl && !imageUrl.startsWith("http")) {
      imageUrl = `${import.meta.env.VITE_CLIENT_DOMAIN}${imageUrl}`;
    }

    const paymentInfo = {
      productId: _id,
      name,
      category,
      price,
      description,
      image: imageUrl,
      quantity: 1,
      seller,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      );

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
          <DialogTitle className="text-lg font-semibold text-center mb-4">
            Review Info Before Purchase
          </DialogTitle>

          <div className="space-y-2 text-gray-600">
            <p>Product: {name}</p>
            <p>Category: {category}</p>
            <p>Customer: {user?.displayName}</p>
            <p className="font-semibold text-gray-800">Price: ৳{price}</p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePayment}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Pay
            </button>

            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-200 text-red-800 rounded-lg hover:bg-red-300"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
