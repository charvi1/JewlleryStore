const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Product = require("./Product"); 

const Category = sequelize.define("Category", {
  CategoryId: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    allowNull: false, 
    autoIncrement: false 
  },
  CategoryName: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
});

Category.hasMany(Product, { foreignKey: "CategoryId" });
module.exports = Category;
