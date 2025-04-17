// AdminProducts.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductList from "./ProductList";  // Assuming you already have this component

const AdminProducts = () => {
  return (
    <div>
      <h3>Manage Products</h3>
    
      <ProductList />
    </div>
  );
};

export default AdminProducts;

