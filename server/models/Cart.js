// models/Cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
  CartId: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  UserID: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User,
      key: 'UserId'
    }
  },
  ProductID: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: Product,
      key: 'ProductId'
    }
  },
  Quantity: { 
    type: DataTypes.INTEGER, 
    defaultValue: 1 
  }
}, {
  tableName: 'Carts',
  timestamps: true
});

// Define associations
Cart.belongsTo(User, { foreignKey: 'UserID' });
Cart.belongsTo(Product, { foreignKey: 'ProductID' });

module.exports = Cart;
