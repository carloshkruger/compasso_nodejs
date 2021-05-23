const { DataTypes } = require('sequelize')
const sequelize = require('../utils/createInstance')
const City = require('./CitySequelizeModel')

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  },
)

User.hasOne(City)

module.exports = User
