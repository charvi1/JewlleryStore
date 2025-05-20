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
  URL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  PhoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  DOB: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  Location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  AlternatePhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  HintName: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

User.belongsTo(Role, { foreignKey: "RoleId" });

module.exports = User;
