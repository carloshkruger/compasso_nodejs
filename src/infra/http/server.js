const app = require('./app')
const { connect } = require('../sequelize/helper')

const run = async () => {
  await connect()

  app.listen(3333)
}

run()
