const sequelize = require("../db");
const Sequelize = require("sequelize");

// Import models
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

// Associations
SubCategory.belongsTo(Category, { foreignKey: 'CategoryId' });
Product.belongsTo(SubCategory, { foreignKey: 'SubCategoryId' });
Product.belongsTo(Category, { foreignKey: 'CategoryId' });

Order.belongsTo(User, { foreignKey: 'UserId' });
Order.belongsTo(Product, { foreignKey: 'ProductId' });

Order.hasOne(ShippingDetails, { foreignKey: "OrderId", onDelete: "CASCADE" });
Order.hasOne(PaymentDetails, { foreignKey: "OrderId", onDelete: "CASCADE" });

// Cart associations
User.hasMany(Cart, { foreignKey: 'UserID' });
Cart.belongsTo(User, { foreignKey: 'UserID' });

Product.hasMany(Cart, { foreignKey: 'ProductID' });
Cart.belongsTo(Product, { foreignKey: 'ProductID' });

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
  Cart,
  sequelize,
};
