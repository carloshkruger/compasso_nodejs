const { Router } = require('express')
const citiesRouter = require('./cities.routes')
const usersRouter = require('./users.routes')

const routes = Router()

routes.use(citiesRouter)
routes.use(usersRouter)

module.exports = routes
