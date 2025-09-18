import React, { createContext, useState, useEffect } from 'react';
import axiosConfig from '../api/axiosConfig';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setAuth({ token, user: { role: decoded.role } });
    }
  }, []);

  const login = async (username, password) => {
    const { data } = await axiosConfig.post('/auth/login', { username, password });
    localStorage.setItem('token', data.token);
    const decoded = jwtDecode(data.token);
    setAuth({ token: data.token, user: { role: decoded.role } });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};