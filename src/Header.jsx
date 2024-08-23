import React, { useState } from "react";
import LoginModal from "./LoginModal";
import "./ToggleSwitch.css";
import { useAuth } from "./context/AuthContext"; // Ensure your CSS for the toggle switch is imported

function Header({ toggleDarkMode, isDarkMode, onSearch }) {
  const { user, logout, authToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    onSearch(query); // Update the search query in the App component
  };

  return (
    <header className="bg-gray-200 dark:bg-gray-800 p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {/* Logo Image */}
        <a href="/">
          <img
            src="/logo.png"
            alt="Restaurant Logo"
            className="w-20 h-20 hover:scale-105 transition-transform"
          />
        </a>

        {/* Brand Identity */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-500">
            PlateVista
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-500">
            Deliciousness delivered
          </p>
        </div>
      </div>

      {/* Other Elements in Header */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="p-1.5 w-40 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          />
          <button className="absolute right-2 top-2 text-gray-500 dark:text-gray-300">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <a
          href="/about"
          className="text-gray-900 dark:text-white hover:text-orange-500 text-sm"
        >
          About Us
        </a>
        <a
          href="/contact"
          className="text-gray-900 dark:text-white hover:text-orange-500 text-sm"
        >
          Contact Us
        </a>

        {/* Login Button */}
        {user && authToken ? (
          <div className="flex items-center space-x-3">
            <span className="text-gray-900 dark:text-white text-sm font-semibold">
              {user}
            </span>
            <button
              onClick={() => logout()}
              className="text-orange-500 dark:text-orange-400 hover:text-orange-600 text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-orange-500 dark:text-orange-400 hover:text-orange-600 text-sm"
          >
            Login
          </button>
        )}

        {/* Dark Mode Toggle */}
        <div className="toggle-switch" onClick={toggleDarkMode}>
          <input type="checkbox" checked={isDarkMode} readOnly />
          <span className="slider"></span>
        </div>
      </div>

      {/* Login Modal */}
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </header>
  );
}

export default Header;
