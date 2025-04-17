import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./singleProduct.css";

const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details.");
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="single-product-page">
      <div className="single-product">
      <div className="product-image">
        <img src={product.ImageURL} alt={product.ProductName} />
      </div>
      <div className="product-info">
        <h1>{product.ProductName}</h1>
        <div className="rating" role="img" aria-label={`${product.rating} out of 5.0 stars`}>
          <span
            aria-hidden="true"
            className="rating-star"
            style={{
              '--rating': product.rating,
              '--rating-max': 5.0,
              '--rating-decimal': 1,
            }}
          ></span>
          </div>
        <h3>₹{product.UnitPrice}</h3>
        <p>{product.ProductDescription}</p>
        <button className="single-product-cart-button" onClick={() => handleAddToCart(product)}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
