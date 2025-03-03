const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Order = require("./Order");

const PaymentDetails = sequelize.define("PaymentDetails", {
  PaymentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  OrderId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Order, key: "OrderId" } },
  PaymentMethod: {
    type: DataTypes.ENUM("Cash", "Credit Card", "Debit Card", "UPI"),
    allowNull: false,
  },
  PaymentStatus: {
    type: DataTypes.ENUM("Pending", "Completed", "Refunded"),
    defaultValue: "Pending",
  },
  TransactionDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Order.hasOne(PaymentDetails, { foreignKey: "OrderId", onDelete: "CASCADE" });
PaymentDetails.belongsTo(Order, { foreignKey: "OrderId" });

module.exports = PaymentDetails;