import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./singleProduct.css";

const SingleProductPage = ({ onLoginClick }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.warn("Please log in to add items to your cart");
      if (onLoginClick) {
        onLoginClick();
      }
      return;
    }

    try {
      console.log('Adding to cart:', {
        email: user.EmailId,
        productId: product.ProductId,
        quantity: 1
      });

      const response = await axios.post("http://localhost:5000/api/cart/add", {
        email: user.EmailId,
        productId: product.ProductId,
        quantity: 1
      });

      if (response.data.success) {
        toast.success("Added to cart successfully!");
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        toast.error(response.data.message || "Failed to add item to cart");
      }
    } catch (err) {
      console.error("Add to cart failed:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to add item to cart. Please try again.");
    }
  };

  if (loading) return <div className="single-product-page">Loading...</div>;
  if (error) return <div className="single-product-page">{error}</div>;
  if (!product) return <div className="single-product-page">Product not found</div>;

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
          <button
            className="single-product-cart-button"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
