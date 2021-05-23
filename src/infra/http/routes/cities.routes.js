const { Router } = require('express')

const createCityControllerFactory = require('../../../factories/controllers/createCityControllerFactory')
const findCitiesByNameControllerFactory = require('../../../factories/controllers/findCitiesByNameControllerFactory')
const findCitiesByStateControllerFactory = require('../../../factories/controllers/findCitiesByStateControllerFactory')
const expressRouterAdapter = require('../adapters/expressRouterAdapter')

const citiesRouter = Router()

citiesRouter.post(
  '/cities/',
  expressRouterAdapter(createCityControllerFactory()),
)
citiesRouter.get(
  '/cities/',
  expressRouterAdapter(findCitiesByNameControllerFactory()),
)
citiesRouter.get(
  '/uf/:state/cities/',
  expressRouterAdapter(findCitiesByStateControllerFactory()),
)

module.exports = citiesRouter
