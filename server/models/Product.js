const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const SubCategory = require("./SubCategory");

const Product = sequelize.define("Product", {
  ProductId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ProductName: { type: DataTypes.STRING(300), allowNull: false },
  ProductDescription: { type: DataTypes.STRING(1000) },
  UnitPrice: { type: DataTypes.DECIMAL(18, 2), allowNull: false },
  Quantity: { type: DataTypes.INTEGER, allowNull: false },
  Qty_Reorder: { type: DataTypes.INTEGER, allowNull: false },
  ImageURL: { type: DataTypes.STRING(500) },  // ✅ Image URL field
});

// Define foreign key relationship
Product.belongsTo(SubCategory, { foreignKey: "SubCategoryId", onDelete: "CASCADE" });

module.exports = Product;