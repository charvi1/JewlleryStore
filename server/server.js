require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db");

sequelize.sync({alter: true })  // This will update the table structure without deleting data
  .then(() => console.log("✅ Database synced with Sequelize"))
  .catch(err => console.error("❌ Sync Error:", err));

// Import Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const locationRoutes = require("./routes/locationRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use Routes
app.use("/api/users", userRoutes);  
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/cart", cartRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
