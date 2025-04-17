import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = ({ setProducts, onClose }) => {
  const [productData, setProductData] = useState({
    ProductName: "",
    ProductDescription: "",
    UnitPrice: "",
    Quantity: "",
    Qty_Reorder: "",
    SubCategoryId: "",
    ImageURL: "", // Assuming you're inputting the image URL manually
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      ProductName,
      ProductDescription,
      UnitPrice,
      Quantity,
      Qty_Reorder,
      SubCategoryId,
      ImageURL,
    } = productData;

    // Validate required fields
    if (
      !ProductName ||
      !ProductDescription ||
      !UnitPrice ||
      !Quantity ||
      !Qty_Reorder ||
      !SubCategoryId ||
      !ImageURL
    ) {
      console.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts((prev) => [...prev, newProduct]);
        onClose(); // Close modal on success
      } else {
        const err = await response.json();
        console.error("Failed to add product:", err);
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h3>Add New Product</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Product Name</label>
            <input
              type="text"
              name="ProductName"
              value={productData.ProductName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="ProductDescription"
              value={productData.ProductDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Unit Price</label>
            <input
              type="number"
              name="UnitPrice"
              value={productData.UnitPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Quantity</label>
            <input
              type="number"
              name="Quantity"
              value={productData.Quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Reorder Quantity</label>
            <input
              type="number"
              name="Qty_Reorder"
              value={productData.Qty_Reorder}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Sub Category ID</label>
            <input
              type="text"
              name="SubCategoryId"
              value={productData.SubCategoryId}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Image URL</label>
            <input
              type="url"
              name="ImageURL"
              value={productData.ImageURL}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
