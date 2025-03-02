const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Category = require("./Category");

const SubCategory = sequelize.define("SubCategory", {
  SubCategoryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  SubCategoryName: { type: DataTypes.STRING, allowNull: false },
});

// Define foreign key relationship
SubCategory.belongsTo(Category, { foreignKey: "CategoryId", onDelete: "CASCADE" });

module.exports = SubCategory;
