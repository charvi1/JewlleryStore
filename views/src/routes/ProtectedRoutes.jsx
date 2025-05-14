// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute Component
const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Redirect to login page if no user is found in localStorage
  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
