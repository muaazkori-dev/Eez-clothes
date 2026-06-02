import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');

  const openAuth = (tab = 'login') => {
    setAuthTab(tab);
    setIsAuthOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
    document.body.style.overflow = '';
  };

  const login = (email, password) => {
    // Simulating login
    setUser({ name: 'VIP Customer', email });
    closeAuth();
    return true;
  };

  const signup = (name, email, password) => {
    // Simulating signup
    setUser({ name, email });
    closeAuth();
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isAuthOpen,
        authTab,
        openAuth,
        closeAuth,
        setAuthTab,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
