import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./products.css";
import { LuDiamond } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";


const ProductPage = () => {
  const { CategoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(null);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({ category: "", price: "", rating: "" });
  

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: { categoryNames: CategoryName },
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [CategoryName]);

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.price) {
      if (filters.price === "below100") filtered = filtered.filter((product) => product.UnitPrice < 100);
      if (filters.price === "1000to2000") filtered = filtered.filter((product) => product.UnitPrice >= 1000 && product.UnitPrice <= 2000);
      if (filters.price === "2000to5000") filtered = filtered.filter((product) => product.UnitPrice >= 2000 && product.UnitPrice <= 5000);
      if (filters.price === "5000to8000") filtered = filtered.filter((product) => product.UnitPrice >= 5000 && product.UnitPrice <= 8000);
      if (filters.price === "8000to10000") filtered = filtered.filter((product) => product.UnitPrice >= 8000 && product.UnitPrice <= 10000);
      if (filters.price === "above10000") filtered = filtered.filter((product) => product.UnitPrice > 10000);
    }

    if (filters.rating) {
      if (filters.rating === "under4") filtered = filtered.filter((product) => product.rating < 4);
      if (filters.rating === "4to4.5") filtered = filtered.filter((product) => product.rating >= 4 && product.rating <= 4.5);
      if (filters.rating === "above4.5") filtered = filtered.filter((product) => product.rating > 4.5);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
    if (type === "price") setOpen(open === 3);
if (type === "rating") setOpen(open === 4 );

  };

  const resetFilters = () => {
    setFilters({ category: "", price: "", rating: "" });
    setFilteredProducts(products);
  };

  const handleAddToCart = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.warn("Please log in to add items to your cart.");
        navigate("/login");
        return;
      }
      const response = await axios.post("http://localhost:5000/api/cart/addToCart", {
        email: user.email,
        productId: product.ProductId,
      });

      if (response.data.success) {
        setCart(response.data.cart);
        toast.success(`${product.ProductName} has been added to your cart!`);
      } else {
        toast.error("Failed to add the item to the cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("An error occurred while adding the product. Please try again.");
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;


  return (
    <section className="products-page">
      <ToastContainer position="top-center" autoClose={3000} />

    <div className="flexcol">

   
      <div className="product-aside">
        <div className="aside-content">
          <div className="aside-category" onClick={() => toggle(3)}>
            <p>Price</p> {open === 3}
          </div>
          {open === 3 && (
            <div className="aside-category-hidden product-show">
              <div className="hidden-radio-container">
                <input type="radio" name="price" onChange={() => handleFilterChange("price", "below100")} />
                <label>Under ₹100</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="price" onChange={() => handleFilterChange("price", "1000to2000")} />
                <label>₹1000 - ₹2000</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="price" onChange={() => handleFilterChange("price", "2000to5000")} />
                <label>₹2000 - ₹5000</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="price" onChange={() => handleFilterChange("price", "5000to8000")} />
                <label>₹5000 - ₹8000</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="price" onChange={() => handleFilterChange("price", "8000to10000")} />
                <label>₹8000 - ₹10000</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="price" onChange={() => handleFilterChange("price", "above10000")} />
                <label>Above ₹10000</label>
              </div>
            </div>
          )}

          <div className="aside-category" onClick={() => toggle(4)}>
            <p>Rating</p>
            <span style={{ marginLeft: "8px" }}>
              {open === 4 }
            </span>
          </div>

          {open === 4 && (
            <div className="aside-category-hidden product-show">
              <div className="hidden-radio-container">
                <input type="radio" name="rating" onChange={() => handleFilterChange("rating", "under4")} />
                <label>Under 4</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="rating" onChange={() => handleFilterChange("rating", "4to4.5")} />
                <label>4 - 4.5</label>
              </div>
              <div className="hidden-radio-container">
                <input type="radio" name="rating" onChange={() => handleFilterChange("rating", "above4.5")} />
                <label>Above 4.5</label>
              </div>
            </div>
          )}
            <div className="reset" onClick={resetFilters}>Reset Filters</div>
        </div>

      
      </div>

      <div className="products-container">
        {filteredProducts.map((product) => (
          <div key={product.ProductId} className="product-card" onClick={() => navigate(`/products/${product.ProductId}`)} style={{ cursor: 'pointer' }}>
            <img src={product.ImageURL} 
              className="w-[100%] h-[100%]"
            />
            <div className="product-details">
              <h5>{product.ProductName}</h5>
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
              <p>₹{product.UnitPrice}</p>
              <button className="product-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default ProductPage;
