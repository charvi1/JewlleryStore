const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Order = require("./Order");

const ShippingDetails = sequelize.define("ShippingDetails", {
  ShippingId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  OrderId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Order, key: "OrderId" } },
  ShippingAddress: { type: DataTypes.STRING(300), allowNull: false },
  EstimatedDeliveryDate: { type: DataTypes.DATEONLY },
  TrackingNumber: { type: DataTypes.STRING(50), unique: true },
  ShippingStatus: {
    type: DataTypes.ENUM("Processing", "Shipped", "Delivered"),
    defaultValue: "Processing",
  },
});

Order.hasOne(ShippingDetails, { foreignKey: "OrderId", onDelete: "CASCADE" });
ShippingDetails.belongsTo(Order, { foreignKey: "OrderId" });

module.exports = ShippingDetails;