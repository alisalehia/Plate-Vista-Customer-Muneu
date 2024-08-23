import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext";

function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", username, password);
      try {
        const response = await axios.post(
          "https://plate-vista-api.vercel.app/api/v1/auth/login",
          {
            username,
            password,
          }
        );
        const authHeader = response.headers.get("authorization");
        const token = authHeader.split(" ")[1];
        console.log(token);
        
        login(token, response.data.username);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("Signing up with:", username, email, password);
      try {
        const { data } = await axios.post(
          "https://plate-vista-api.vercel.app/api/v1/users",
          {
            username,
            email,
            password,
          }
        );
        console.log(data.username);
        setUser(data.username);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }
    handleClose(); // Use handleClose for smooth transition
  };

  const handleClose = () => {
    document.getElementById("login-modal").classList.add("fade-out");
    setTimeout(onClose, 500); // Delay to allow fade-out animation
  };

  const handleSwitchForm = () => {
    document.getElementById("login-form").classList.add("fade-out");
    setTimeout(() => {
      setIsLogin(!isLogin);
      document.getElementById("login-form").classList.remove("fade-out");
    }, 500); // Delay to allow the fade-out animation before switching forms
  };

  return (
    <div
      id="login-modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500 ease-in-out fade-in"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-500 ease-in-out scale-95">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {isLogin ? "Login" : "Create Account"}
        </h2>
        <form
          id="login-form"
          onSubmit={handleSubmit}
          className="transition-opacity duration-500 ease-in-out"
        >
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Enter your username"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter your email"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded w-full"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={handleSwitchForm}
            className="text-blue-500 dark:text-blue-400 underline"
          >
            {isLogin ? "Create one" : "Log in"}
          </button>
        </p>
        <button
          onClick={handleClose}
          className="mt-4 text-red-500 dark:text-red-400 underline block text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
