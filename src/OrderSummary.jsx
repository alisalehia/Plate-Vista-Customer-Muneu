import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import OrderItem from "./OrderItem";
import { timeSinceOrder } from "./utils/utils";

const OrderSummary = () => {
  const navigate = useNavigate();
  const { cart, orders, clearOrders } = useCart();
  const handleCheckout = () => {
    if (orders.length === 0) {
      return;
    }

    // Add a slight delay to allow for a smoother transition
    const summaryBox = document.querySelector(".order-summary-box");
    summaryBox.classList.add("closing");
    clearOrders();

    setTimeout(() => {
      navigate("/checkout", { state: { cart } });
    }, 700); // Match this duration with your CSS animation duration for smoothness
  };

  const totalPrice = orders.reduce((total, item) => total + item?.totalPrice, 0);

  return (
    <div className="order-summary-box bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4 shadow-md">
      <h2 className="text-xl mb-4 font-bold">Order Summary</h2>

      <ul className="flex flex-col space-y-2">
        {orders?.map((item) => (
          <div className="border p-3 space-y-1 rounded-lg">
            <span className="text-[0.785rem] tracking-wider">
              {item?.orderStatus}
            </span>
            <OrderItem key={item._id} item={item} />
            <span className='text-[0.785rem] font-semibold opacity-80'>{timeSinceOrder(item.createdAt)}</span>
          </div>
        ))}
      </ul>
      <p className="mt-4 font-bold">Total: ${totalPrice?.toFixed(2)}</p>
      <button
        onClick={handleCheckout}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
