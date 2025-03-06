const sequelize = require("../db");
const Category = require("./Category");
const SubCategory = require("./SubCategory");
const Product = require("./Product");
const Order = require("./Order");
const User=require("./User");
const PaymentDetails = require("./PaymentDetails");
const ShippingDetails = require("./ShippingDetails");
const { Country, State, Region } = require("./Location");
const { Department, Designation, Employee } = require("./Employee");

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

module.exports = {
  Category,
  SubCategory,
  User,
  Product,
  Order,
  PaymentDetails,
  ShippingDetails,
  Country,
  State,
  Region,
  Department,
  Designation,
  Employee,
};
