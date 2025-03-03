const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || "jewelryecomdb",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "220206vb",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false, // Disable logging for cleaner output
  }
);

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("✅ MySQL Connected via Sequelize!"))
  .catch((err) => console.error("❌ Connection error:", err));

module.exports = sequelize;
