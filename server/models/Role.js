const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Role = sequelize.define("Role", {
  RoleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  RoleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Role;
