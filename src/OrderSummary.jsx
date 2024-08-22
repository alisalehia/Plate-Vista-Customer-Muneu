import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const OrderSummary = () => {
    const navigate = useNavigate();
    const {cart} = useCart();
    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Add a slight delay to allow for a smoother transition
        const summaryBox = document.querySelector('.order-summary-box');
        summaryBox.classList.add('closing');

        setTimeout(() => {
            navigate('/checkout', { state: { cart } });
        }, 700); // Match this duration with your CSS animation duration for smoothness
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="order-summary-box bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4 shadow-md">
            <h2 className="text-xl mb-4 font-bold">Order Summary</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item._id}>
                            {item.title} (x{item.quantity}) - ${(item.price * item.quantity).toFixed(2)}
                        </li>
                    ))}
                </ul>
            )}
            <p className="mt-4 font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button 
                onClick={handleCheckout}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4">
                Proceed to Checkout
            </button>
        </div>
    );
};

export default OrderSummary;
