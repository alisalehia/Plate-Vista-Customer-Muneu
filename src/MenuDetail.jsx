import React, { useState } from "react";
import { useCart } from "./context/CartContext";

function MenuDetail({ item, closeDetail }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [capacity, setCapacity] = useState("300ml"); // Default capacity
  const [price, setPrice] = useState(item.price); // Default price

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleCapacityChange = (e) => {
    const selectedCapacity = e.target.value;
    setCapacity(selectedCapacity);
    if (selectedCapacity === "300ml") {
      setPrice(item.price); // Default price for 300ml
    } else if (selectedCapacity === "500ml") {
      setPrice(item.price + 2); // Increase price for 500ml by $2 (example)
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...item,
      quantity,
      capacity: item.category === "beer" ? capacity : null,
      price:
        item.category === "beer" ? price * quantity : item.price * quantity,
    });

    // Trigger the close animation
    triggerCloseAnimation();
  };

  const triggerCloseAnimation = () => {
    const modalContent = document.querySelector(".modal-content");
    const modalOverlay = document.querySelector(".modal-overlay");

    if (modalContent && modalOverlay) {
      modalContent.classList.add("closing");
      modalOverlay.classList.add("fading");

      setTimeout(() => {
        closeDetail(); // Close the modal after the animation completes
      }, 700); // Match this duration with your CSS animation duration for smoothness
    } else {
      closeDetail(); // Fallback in case the elements are not found
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={triggerCloseAnimation}>
          Close
        </button>
        <img src={item.image} alt={item.title} className="modal-image" />
        <h3 className="text-2xl mb-2">{item.title}</h3>
        <p className="text-sm mb-4">{item.description}</p>
        <p className="text-lg mb-4">
          ${item.category === "beer" ? price : item?.price}
        </p>

        {/* Capacity selection for Drinking items */}
        {item?.category === "beer" && (
          <div className="mt-2 mb-4">
            <label className="block text-sm mb-2">Capacity:</label>
            <select
              value={capacity}
              onChange={handleCapacityChange}
              className="modal-select"
            >
              <option value="300ml">300ml - ${item.price}</option>
              <option value="500ml">500ml - ${item.price + 2}</option>
            </select>
          </div>
        )}

        <div className="mt-2 mb-4">
          <label className="block text-sm">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="modal-input"
          />
        </div>
        <button onClick={handleAddToCart} className="modal-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default MenuDetail;
