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
import { CartProvider } from "./context/CartContext";
import { useWebSocketContext } from "./context/WebSocketContext";
import "./app.css";
import MainCategoryContainer from "../MainCategoryContainer";
import { useAuth } from "./context/AuthContext";

function App() {
  const { sendMessage, messages, readyState, lastMessage } =
    useWebSocketContext();
  const { authToken, logout } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [ user , setUser ] = useState(null);
  useEffect(() => {
    const authUser = async (token) => {
      try {
        const response = await axios.get(
          `https://plate-vista-api.vercel.app/api/v1/auth/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status != 200) {
          logout();
        }
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    authUser(authToken);
  }, [authToken]);

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
          <div className="max-w-screen-xl mx-auto">
            <Header
              toggleDarkMode={toggleDarkMode}
              isDarkMode={isDarkMode}
              onSearch={handleSearch}
            />
            <MenuNav categories={categories} />
            <div className="container mx-auto p-6 flex flex-col md:flex-row ">
              <div className="w-full md:w-3/4 pr-0 md:pr-10">
                <span className="text-center text-white">
                  {" "}
                  {readyState === 0
                    ? "Connecting..."
                    : readyState === 1
                    ? "Connected"
                    : "Disconnected"}{" "}
                </span>
                <Routes>
                  {categories?.map((category) => (
                    <Route
                      key={category}
                      path={`/${category}`}
                      element={
                        <MainCategoryContainer
                          categoryName={category}
                          openDetail={openDetail}
                          searchQuery={searchQuery}
                        />
                      }
                    />
                  ))}
                  {/* Add Routes Here */}
                  <Route path="/" element={<Navigate to="/beer" />} />
                  <Route
                    path="/order-confirmation"
                    element={<OrderConfirmation />}
                  />
                  <Route
                    path="/checkout"
                    element={<Checkout onPlaceOrder={handlePlaceOrder} />}
                  />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/about" element={<AboutUs />} />
                </Routes>
              </div>
              <div className="w-full md:w-1/4 flex flex-col space-y-4 mt-6 md:mt-0 ">
                <Cart />
                <OrderSummary />
              </div>
            </div>
            <OrderNow user={user} />
            <Footer />
          </div>
          {selectedItem && (
            <MenuDetail item={selectedItem} closeDetail={closeDetail} />
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
