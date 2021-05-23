const { DataTypes } = require('sequelize')
const sequelize = require('../utils/createInstance')

const City = sequelize.define(
  'City',
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
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'cities',
    timestamps: true,
  },
)

module.exports = City
