const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");  // ✅ Correct import
const Product = require("./Product");

const Order = sequelize.define("Order", {
  OrderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UserId: {  // ✅ Use 'UserId' instead of 'CustomerId'
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,  // ✅ Link to User table
      key: "UserId",
    },
  },
  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: "ProductId",
    },
  },
  quantityOrdered: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  TotalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  OrderStatus: {
    type: DataTypes.ENUM("Pending", "Shipped", "Delivered", "Cancelled"),
    defaultValue: "Pending",
  },
});

Order.belongsTo(User, { foreignKey: "UserId" });  // ✅ Correct reference
Order.belongsTo(Product, { foreignKey: "ProductId" });

module.exports = Order;
