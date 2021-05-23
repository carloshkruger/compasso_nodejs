const { Sequelize } = require('sequelize')
const isTestEnvironment = require('../../../shared/utils/isTestEnvironment')

const storageName = isTestEnvironment()
  ? 'test_database.sqlite'
  : 'database.sqlite'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `src/infra/sequelize/${storageName}`,
  logging: false,
})

module.exports = sequelize
