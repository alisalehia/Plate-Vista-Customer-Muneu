import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useWebSocketContext } from "./context/WebSocketContext";

const OrderNow = ({ user }) => {
  const { sendMessage, messages, readyState, lastMessage, setUserId } =
    useWebSocketContext();

  const { cart, clearCart, addOrder, orders } = useCart();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [tableNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserId(user.user.id);
    }
  }, [user]);

  useEffect(() => {
    if (lastMessage) {
      const messageData = JSON.parse(lastMessage.data);
      if (messageData.type === "orderSuccess") {
        console.log(messageData);
        addOrder(messageData.payload);
        clearCart();
      }
    }
  }, [lastMessage]);

  const handleSendMessages = () => {
    const menuItemsForSend = cart.map((item) => {
      return { product: item._id, quantity: item.quantity };
    });

    sendMessage(
      JSON.stringify({
        type: "newOrder",
        payload: {
          user: user?.user.id,
          menuItems: menuItemsForSend,
        },
      })
    );
  };

  const handleOrderNowClick = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to your cart.");
      return;
    }
    handleSendMessages();
    setIsLoading(true); // Show loading animation

    // Simulate a delay for loading
    setTimeout(() => {
      setIsLoading(false);
      setIsConfirmationOpen(true);
    }, 1500); // 1.5 seconds delay
  };

  const handleFeedbackSubmit = () => {
    // Close feedback modal with animation
    setIsFeedbackOpen(false);

    // Open thank you modal after a short delay for smooth transition
    setTimeout(() => {
      setIsThankYouOpen(true);
    }, 500); // 0.5 seconds delay for transition
  };

  const handleCloseThankYou = () => {
    setIsThankYouOpen(false);

    // Close everything after a slight delay for smooth transition
    setTimeout(() => {
      setIsConfirmationOpen(false); // Close the order confirmation box
      navigate("/"); // Redirect to the home page
    }, 500); // 0.5 seconds delay for smooth transition
  };

  const handleNeedHelpClick = () => {
    alert("Customer service will reach out to you shortly!");
    setIsConfirmationOpen(false);
    navigate("/"); // Redirect to the home page
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOrderNowClick}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mt-4 fixed bottom-10 right-10"
      >
        Order Now
      </button>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="custom-loader"></div>
        </div>
      )}

      {isConfirmationOpen && !isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-500 ease-in-out">
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 rounded-lg shadow-lg max-w-lg w-full relative transform transition-transform duration-500 ease-in-out scale-95">
            <button
              onClick={handleCloseConfirmation}
              className="absolute top-2 right-2 text-gray-900 dark:text-white text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
            <p>Thank you, your order has been placed successfully.</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between mb-1">
                  <span>
                    {item.title} (x{item.quantity})
                  </span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-700 mt-2 pt-2">
                <strong>Total:</strong> $
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </div>
              <p className="mt-2">
                <strong>Table Number:</strong> {tableNumber}
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                Feedback
              </button>
              <span className="text-center text-white">
                {" "}
                {readyState === 0
                  ? "Connecting..."
                  : readyState === 1
                  ? "Connected"
                  : "Disconnected"}{" "}
              </span>
              <button
                onClick={handleNeedHelpClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-transform duration-500 ease-in-out transform hover:scale-105"
              >
                Need Help
              </button>
            </div>
          </div>
        </div>
      )}

      {isFeedbackOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-500 ease-in-out">
          <div className="modal-content scale-95 transition-transform duration-500 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Feedback</h2>
            <div className="mb-4">
              <label className="block mb-2">Rating:</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer text-2xl ${
                      star <= rating ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Review:</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                rows="4"
                placeholder="Write your review here..."
              ></textarea>
            </div>
            <button
              onClick={handleFeedbackSubmit}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-transform duration-500 ease-in-out transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {isThankYouOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-500 ease-in-out">
          <div className="modal-content scale-95 transition-transform duration-500 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p>Your feedback has been submitted successfully.</p>
            <button
              onClick={handleCloseThankYou}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6 transition-transform duration-500 ease-in-out transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderNow;
