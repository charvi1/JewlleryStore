const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Category = require("./Category");

class SubCategory extends Model {}

SubCategory.init(
  {
    SubCategoryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    SubCategoryName: { type: DataTypes.STRING, allowNull: false },
    CategoryId: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }, // ✅ Ensure createdAt exists
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }, // ✅ Ensure updatedAt exists
  },
  {
    sequelize,
    modelName: "SubCategory",
    tableName: "SubCategories",
    timestamps: true, // ✅ Enable timestamps
  }
);

// ✅ Define association AFTER model setup
SubCategory.belongsTo(Category, { foreignKey: "CategoryId", onDelete: "CASCADE" });

module.exports = SubCategory;
