import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AuthForm from "./components/Auth/AuthForm";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q) navigate("/products");
  };

  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header onSearch={handleSearch} searchValue={searchQuery} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/products"
                element={<ProductsPage searchQuery={searchQuery} />}
              />
              <Route path="/signin" element={<AuthForm mode="signin" />} />
              <Route path="/signup" element={<AuthForm mode="signup" />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

function NotFound() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "4rem" }}>🔍</span>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          fontWeight: 700,
        }}
      >
        Page Not Found
      </h1>
      <p style={{ color: "var(--color-text-muted)" }}>
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        style={{
          marginTop: 8,
          padding: "12px 24px",
          background: "var(--color-accent)",
          color: "#fff",
          borderRadius: "var(--radius-md)",
          fontWeight: 600,
          fontSize: "0.9rem",
        }}
      >
        Go Home
      </a>
    </div>
  );
}
