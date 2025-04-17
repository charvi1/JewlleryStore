const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const SubCategory = require("./SubCategory");

const Product = sequelize.define("Product", {
  ProductId: { type: DataTypes.INTEGER, primaryKey: true, allowNull:false,autoIncrement: false },
  ProductName: { type: DataTypes.STRING(300), allowNull: false },
  ProductDescription: { type: DataTypes.STRING(1000) },
  UnitPrice: { type: DataTypes.DECIMAL(18, 2), allowNull: false },
  Quantity: { type: DataTypes.INTEGER, allowNull: false },
  Qty_Reorder: { type: DataTypes.INTEGER, allowNull: false },
  ImageURL: { type: DataTypes.STRING(1000),  validate: {
    isUrl: {
      args: true,
      msg: 'Invalid URL format',
    },
  }, },
  SubCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating:{
    type: DataTypes.FLOAT,
    allowNull:false,
    defaultValue: 0
  },
});

// Define foreign key relationship with SubCategory
Product.belongsTo(SubCategory, { foreignKey: "SubCategoryId", onDelete: "CASCADE" });
SubCategory.hasMany(Product, { foreignKey: "SubCategoryId" });

module.exports = Product;