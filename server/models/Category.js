const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Category = sequelize.define("Category", {
  CategoryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  CategoryName: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Category;
