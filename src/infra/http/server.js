const app = require('./app')
const { connect } = require('../sequelize/helper')

const run = async () => {
  await connect()

  app.listen(process.env.PORT || 3333)
}

run()
