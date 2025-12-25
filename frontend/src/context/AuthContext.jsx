import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Auth check failed", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const session = await AuthService.login(credentials);
    await checkUserStatus();
    return session;
  };

  const signup = async (userData) => {
    const newUser = await AuthService.signup(userData);
    await checkUserStatus();
    return newUser;
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    checkUserStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
