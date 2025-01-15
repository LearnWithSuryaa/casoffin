import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import GalleryCarousel from "./components/GalleryCarousel";
import CekKhodam from "./components/CekKhodam";
import LoginPage from "./components/LoginPage";

// Komponen untuk menangani protected routes
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simpan status login di localStorage agar tidak hilang saat refresh
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  return (
    <Router>
      <div className="App bg-gray-100">
        <Routes>
          {/* Halaman Login */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          {/* Halaman Utama */}
          <Route path="/" element={<HeroSection isLoggedIn={isLoggedIn} />} />

          {/* Protected Routes */}
          <Route
            path="/gallery"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <GalleryCarousel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cek-khodam"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CekKhodam />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Footer ada di semua halaman */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
