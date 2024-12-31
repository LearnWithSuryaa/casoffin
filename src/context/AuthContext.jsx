import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Membuat konteks Auth
const AuthContext = createContext();

// Komponen AuthProvider untuk menyediakan konteks kepada komponen anak
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // True jika ada user yang login
    });
    return () => unsubscribe(); // Cleanup listener saat komponen unmount
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook custom untuk mengakses AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
