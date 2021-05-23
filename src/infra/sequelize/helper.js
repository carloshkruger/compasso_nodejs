const sequelize = require('./utils/createInstance')

require('./models')

const connect = async () => {
  await sequelize.sync()
  await sequelize.authenticate()
}

const disconnect = async () => {
  await sequelize.close()
}

const clearDataBase = async () => {
  const promises = Object.values(sequelize.models).map((model) => {
    return model.destroy({
      where: {},
      truncate: true,
    })
  })

  await Promise.all(promises)
}

module.exports = {
  connect,
  disconnect,
  clearDataBase,
}
