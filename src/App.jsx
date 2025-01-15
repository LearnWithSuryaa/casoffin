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
import WallOfSecretsPage from "./pages/WallOfSecretsPage";
import NotFoundPage from "./pages/NotFoundPage"; 
import { AuthProvider, useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App bg-gray-100">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HeroPage />} />

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
            <Route
              path="/wall-of-secrets"
              element={
                <ProtectedRoute>
                  <WallOfSecretsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
