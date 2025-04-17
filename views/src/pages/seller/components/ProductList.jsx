import React, { useState } from 'react';
import './ProductList.css';

const ProductList = ({ products, deleteProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const filterProducts = () => {
    return products.filter((product) => {
      const matchCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchPrice = selectedPrice ? checkPrice(product.price, selectedPrice) : true;
      return matchCategory && matchPrice;
    });
  };

  const checkPrice = (price, range) => {
    switch (range) {
      case 'below10000': return price < 10000;
      case '10000to20000': return price >= 10000 && price <= 20000;
      case 'above20000': return price > 20000;
      default: return true;
    }
  };

  return (
    <div className="product-list-container">
      <h2>Product List</h2>

      <div className="filters-horizontal">
        <div className="filter-item">
          <label>Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="necklaces">Necklaces</option>
            <option value="earrings">Earrings</option>
            <option value="rings">Rings</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Price:</label>
          <select value={selectedPrice} onChange={handlePriceChange}>
            <option value="">All</option>
            <option value="below10000">Below ₹10000</option>
            <option value="10000to20000">₹10000 - ₹20000</option>
            <option value="above20000">Above ₹20000</option>
          </select>
        </div>
      </div>

      <ul className="product-list">
        {filterProducts().map((product) => (
          <li key={product._id}>
            {product.name} - {product.category} - ₹{product.price}
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
