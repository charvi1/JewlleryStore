const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Department = sequelize.define("Department", {
  DeptId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  DName: { type: DataTypes.STRING(300), allowNull: false },
});

const Designation = sequelize.define("Designation", {
  DesigId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  DesigName: { type: DataTypes.STRING(300), allowNull: false },
});

const Employee = sequelize.define("Employee", {
  EmpId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FName: { type: DataTypes.STRING(200), allowNull: false },
  LName: { type: DataTypes.STRING(200), allowNull: false },
  DeptId: { type: DataTypes.INTEGER, allowNull: false },
  DesigId: { type: DataTypes.INTEGER, allowNull: false },
  Salary: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
});

// Associations
Employee.belongsTo(Department, { foreignKey: "DeptId", onDelete: "CASCADE" });
Employee.belongsTo(Designation, { foreignKey: "DesigId", onDelete: "CASCADE" });

module.exports = { Department, Designation, Employee };
