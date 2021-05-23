const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/infra/sequelize/database.sqlite',
})

module.exports = sequelize
