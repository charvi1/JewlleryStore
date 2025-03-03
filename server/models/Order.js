const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Order = sequelize.define("Order", {
  OrderId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  CustomerId: { type: DataTypes.INTEGER, allowNull: false },
  DateOfOrder: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  TotalAmount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  OrderStatus: {
    type: DataTypes.ENUM("Pending", "Shipped", "Delivered", "Cancelled"),
    defaultValue: "Pending",
  },
});

module.exports = Order;
