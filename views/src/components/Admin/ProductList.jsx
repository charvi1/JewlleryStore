import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "./AddProduct"; // ✅ Correct import
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false); // ✅ Correct placement

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
        // setProducts(products.filter((product) => product.ProductId !== id));
      } catch (error) {
        console.error("Delete error:", error.message);
      }
    }
  };

  const handleAddProduct = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchProducts(); // Refresh after add
  };

  return (
    <div className="product-list-container">
      <div className="header-row">
        <h2>Manage Products</h2>
        <button className="add-button" onClick={handleAddProduct}>
          + Add Product
        </button>
      </div>

      <table className="product-list-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.ProductId}>
                <td>
                  {product.ImageURL ? (
                    <img src={product.ImageURL} alt={product.ProductName} className="product-img" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{product.ProductName}</td>
                <td>₹{product.UnitPrice}</td>
                <td>{product.Quantity}</td>
                <td>{product.Quantity > 0 ? "In Stock" : "Out of Stock"}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(product.ProductId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* POPUP FORM */}
      {showForm && <AddProduct setProducts={setProducts} onClose={handleCloseForm} />}
    </div>
  );
};

export default ProductList;
