import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./Header";
import MenuNav from "./MenuNav";
import MenuDetail from "./MenuDetail";
import Cart from "./Cart";
import OrderSummary from "./OrderSummary";
import Checkout from "./Checkout";
import OrderConfirmation from "./OrderConfirmation";
import OrderNow from "./OrderNow";
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import { CartProvider } from "./CartContext";

import "./app.css";
import MainCategoryContainer from "../MainCategoryContainer";
function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(
          `https://plate-vista-api.vercel.app/api/v1/menu-items/category`
        );
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const openDetail = (item) => {
    setSelectedItem(item);
  };

  const closeDetail = () => {
    setSelectedItem(null);
  };

  const handlePlaceOrder = (orderDetails) => {
    console.log("Order placed:", orderDetails);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <CartProvider>
      {" "}
      {/* Wrap your entire app with CartProvider */}
      <Router>
        {" "}
        {/* Ensure everything is wrapped within Router */}
        <div
          className={`min-h-screen ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
          }`}
        >
          <Header
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
            onSearch={handleSearch}
          />
          <MenuNav categories={categories} />
          <div className="container mx-auto p-6 flex flex-col md:flex-row ">
            <div className="w-full md:w-3/4 pr-0 md:pr-10">
              <Routes>
                {categories?.map((category) => (
                  <Route
                    key={category}
                    path={`/${category}`}
                    element={<MainCategoryContainer categoryName={category} openDetail={openDetail} searchQuery={searchQuery} />}
                  />
                ))}
                {/* Add Routes Here */}
                <Route path="/" element={<Navigate to="/beer" />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/checkout" element={<Checkout onPlaceOrder={handlePlaceOrder} />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/about-us" element={<AboutUs />} />
              </Routes>
            </div>
            <div className="w-full md:w-1/4 flex flex-col space-y-4 mt-6 md:mt-0 ">
              <Cart />
              <OrderSummary />
            </div>
          </div>
          <OrderNow  />
          <Footer />
        </div>
        {selectedItem && (
          <MenuDetail
            item={selectedItem}
            closeDetail={closeDetail}
          />
        )}
      </Router>
    </CartProvider>
  );
}

export default App;
