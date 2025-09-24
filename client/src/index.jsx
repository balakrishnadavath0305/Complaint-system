import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";  // Import AuthProvider
import { UserProvider } from './context/UserContext';
import ComplaintPage from './pages/ComplaintPage';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <UserProvider> {/* ✅ Must be here */}
      <App />
    </UserProvider>
  </BrowserRouter>
);
