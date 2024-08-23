import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WebSocketProvider } from "./context/WebSocketContext";
ReactDOM.render(
  <React.StrictMode>
    <WebSocketProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </WebSocketProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
