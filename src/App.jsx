import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import GalleryPage from "./pages/GalleryPage";
import CekKhodam from "./pages/CekKhodam";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Gunakan AuthContext

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Ambil status login dari AuthContext
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App bg-gray-100">
          <Routes>
            {/* Halaman Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Halaman Register */}
            <Route path="/register" element={<RegisterPage />} />

            {/* Halaman Utama */}
            <Route path="/" element={<HeroPage />} />

            {/* Protected Routes */}
            <Route
              path="/gallery"
              element={
                <ProtectedRoute>
                  <GalleryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cek-khodam"
              element={
                <ProtectedRoute>
                  <CekKhodam />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
