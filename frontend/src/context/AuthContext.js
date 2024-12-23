import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const login = (role, token) => {
    console.log("Role:", role);
  console.log("Token to store in localStorage:", token);
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("authToken", token); // Ulož token
    if (role === 'master') {
      navigate('/dashboard'); // Přesměruj při roli master
    } else if (role === 'doctor') {
      navigate('/workers'); // Přesměruj při roli  doctor
    } else if (role === 'worker') {
      navigate('/patients'); // Přesměruj při roli worker
    } else {
      navigate('/login'); 
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("authToken"); // Odstran token
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token retrieved from localStorage:", token);
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
