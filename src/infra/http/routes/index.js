const { Router } = require('express')
const citiesRouter = require('./cities.routes')

const routes = Router()

routes.use(citiesRouter)

module.exports = routes
