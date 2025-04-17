const { DataTypes } = require("sequelize");
const sequelize = require("../db")
const Role = require("./Role");

const User = sequelize.define("User", {
  UserId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  UserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  EmailId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RoleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: "RoleId",
    },
  },
});

User.belongsTo(Role, { foreignKey: "RoleId" });

module.exports = User;
