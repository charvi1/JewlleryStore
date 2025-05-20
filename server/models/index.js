const sequelize = require("../db");
const Sequelize = require("sequelize");

// Import models (without associations inside the individual files)
const Category = require("./Category");
const SubCategory = require("./SubCategory");
const Product = require("./Product");
const Order = require("./Order");
const User = require("./User");
const PaymentDetails = require("./PaymentDetails");
const ShippingDetails = require("./ShippingDetails");
const Cart = require("./Cart");

const { Country, State, Region } = require("./Location");
const { Department, Designation, Employee } = require("./Employee");

// Define associations centrally here

// Category & SubCategory
SubCategory.belongsTo(Category, { foreignKey: 'CategoryId', onDelete: "CASCADE" });
Category.hasMany(SubCategory, { foreignKey: 'CategoryId' });

// Product relationships
Product.belongsTo(SubCategory, { foreignKey: 'SubCategoryId', onDelete: "CASCADE" });
SubCategory.hasMany(Product, { foreignKey: 'SubCategoryId' });

Product.belongsTo(Category, { foreignKey: 'CategoryId', onDelete: "CASCADE" });
Category.hasMany(Product, { foreignKey: 'CategoryId' });

// Order relationships
Order.belongsTo(User, { foreignKey: 'UserId', onDelete: "CASCADE" });
User.hasMany(Order, { foreignKey: 'UserId' });

Order.belongsTo(Product, { foreignKey: 'ProductId', onDelete: "CASCADE" });
Product.hasMany(Order, { foreignKey: 'ProductId' });

Order.hasOne(ShippingDetails, { foreignKey: "OrderId", onDelete: "CASCADE" });
ShippingDetails.belongsTo(Order, { foreignKey: "OrderId" });

Order.hasOne(PaymentDetails, { foreignKey: "OrderId", onDelete: "CASCADE" });
PaymentDetails.belongsTo(Order, { foreignKey: "OrderId" });

// Cart associations
User.hasMany(Cart, { foreignKey: 'UserID', onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: 'UserID' });

Product.hasMany(Cart, { foreignKey: 'ProductID', onDelete: "CASCADE" });
Cart.belongsTo(Product, { foreignKey: 'ProductID' });

// Sync all models and create tables if they don't exist
sequelize
  .sync({ force: false, alter: false })
  .then(() => console.log("✅ All tables are synchronized!"))
  .catch((err) => console.error("❌ Error syncing tables:", err));

module.exports = {
  sequelize,
  Category,
  SubCategory,
  Product,
  User,
  Order,
  PaymentDetails,
  ShippingDetails,
  Cart,
  Country,
  State,
  Region,
  Department,
  Designation,
  Employee,
};
