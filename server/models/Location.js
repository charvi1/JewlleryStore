const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Country = sequelize.define("Country", {
  CountryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  CountryName: { type: DataTypes.STRING(300), allowNull: false },
});

const State = sequelize.define("State", {
  StateId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  StateName: { type: DataTypes.STRING(300), allowNull: false },
  CountryId: { type: DataTypes.INTEGER, allowNull: false },
});

const Region = sequelize.define("Region", {
  RegionId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  RegionName: { type: DataTypes.STRING(300), allowNull: false },
  CountryId: { type: DataTypes.INTEGER, allowNull: false },
});

// Associations
State.belongsTo(Country, { foreignKey: "CountryId", onDelete: "CASCADE" });
Region.belongsTo(Country, { foreignKey: "CountryId", onDelete: "CASCADE" });

module.exports = { Country, State, Region };
