// src/Context/UserContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// UserProvider component to provide user data to the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial state is null (no user logged in)

  // Function to log in the user and update the user state
  const login = (userData) => setUser(userData);

  // Function to log out the user and reset the user state
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
