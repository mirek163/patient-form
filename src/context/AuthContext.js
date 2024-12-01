import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // "user", "doctor", nebo "nurse"
  const navigate = useNavigate();

  const login = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    navigate("/patients"); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/login"); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
