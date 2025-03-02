const sequelize = require("../db");
const Category = require("./Category");
const SubCategory = require("./SubCategory");
const Product = require("./Product");

// Sync all models and create tables if they don't exist
sequelize.sync({ alter: true })
  .then(() => console.log("✅ All tables are synchronized!"))
  .catch((err) => console.error("❌ Error syncing tables:", err));

module.exports = { Category, SubCategory, Product };
