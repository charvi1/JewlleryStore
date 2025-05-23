import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StripeCheckout from "./components/StripeCheckout";
import { handleStripeCheckout } from "./components/StripeCheckout";

import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.warn("Please log in to view your cart");
        navigate("/login");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/cart/get", {
        email: user.EmailId,
      });

      if (response.data.success) {
        setCartItems(response.data.cart);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post("http://localhost:5000/api/cart/update", {
        email: user.EmailId,
        productId,
        quantity: newQuantity,
      });

      if (response.data.success) {
        setCartItems(response.data.cart);
        toast.success("Cart updated successfully");
      }
    } catch (err) {
      console.error("Error updating cart:", err);
      toast.error("Failed to update cart");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post("http://localhost:5000/api/cart/remove", {
        email: user.EmailId,
        productId,
      });

      if (response.data.success) {
        setCartItems(response.data.cart);
        toast.success("Item removed from cart");
      }
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Failed to remove item");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.Product ? Number(item.Product.UnitPrice) : 0;
      return total + price * item.Quantity;
    }, 0);
  };

  if (loading) {
    return <div className="cart-container">Loading...</div>;
  }
return (
  <div className="cart">
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.ProductID} className="cart-card">
              <div className="product-image-name">
                <img
                  src={item.Product?.ImageURL}
                  alt={item.Product?.ProductName}
                  className="cart-card-img"
                />
                <div>
                  <h3>{item.Product?.ProductName || "Unnamed Product"}</h3>
                </div>
              </div>

              <div className="cart-card-details">
                <div className="cart-p">
                  <p><strong>Quantity:</strong> {item.Quantity}</p>
                  <p><strong>Price:</strong> ₹{Number(item.Product?.UnitPrice).toFixed(2)}</p>
                </div>
              </div>

              <div className="cart-btns">
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item.ProductID, item.Quantity - 1)}
                    disabled={item.Quantity <= 1}
                  >-</button>
                  <span>{item.Quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.ProductID, item.Quantity + 1)}
                  >+</button>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(item.ProductID)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹{calculateTotal().toFixed(2)}</h3>
            <button
              className="checkout-button"
              onClick={() =>
                handleStripeCheckout(calculateTotal(), cartItems, () => {
                  console.log("Payment successful!");
                  toast.success("Payment Successful");
                })
              }
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div></div>
  );
};

export default CartPage;
