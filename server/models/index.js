const sequelize = require("../db");
const Category = require("./Category");
const SubCategory = require("./SubCategory");
const Product = require("./Product");
const Order = require("./Order");
const PaymentDetails = require("./PaymentDetails");
const ShippingDetails = require("./ShippingDetails");

// Associations
Order.hasOne(PaymentDetails, { foreignKey: "OrderId", onDelete: "CASCADE" });
PaymentDetails.belongsTo(Order, { foreignKey: "OrderId" });

Order.hasOne(ShippingDetails, { foreignKey: "OrderId", onDelete: "CASCADE" });
ShippingDetails.belongsTo(Order, { foreignKey: "OrderId" });

// Sync all models and create tables if they don't exist
sequelize
  .sync({ force: false, alter: false })
  .then(() => console.log("✅ All tables are synchronized!"))
  .catch((err) => console.error("❌ Error syncing tables:", err));

module.exports = { Category, SubCategory, Product };