const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Category = require("./Category");

class SubCategory extends Model {}

SubCategory.init(
  {
    SubCategoryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    SubCategoryName: { type: DataTypes.STRING, allowNull: false },
    CategoryId: { type: DataTypes.INTEGER, allowNull: false }
  },

  {
    sequelize, // Pass the sequelize instance here
    modelName: "SubCategory"
  }

);
// SubCategory.associate = (models) => {
//   SubCategory.belongsTo(models.Category, { foreignKey: "CategoryId" });
//   SubCategory.hasMany(models.Product, { foreignKey: "SubCategoryId" });
// };

module.exports = SubCategory;
