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
      references: {
        model: City,
        key: 'id',
      },
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  },
)

module.exports = User
