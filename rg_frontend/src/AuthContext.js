// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('access_token', token); // Save token in local storage
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('access_token'); // Remove token from local storage
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
