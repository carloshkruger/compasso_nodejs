const { Router } = require('express')
const CreateCityController = require('../../../controllers/CreateCityController')
const FindCitiesByNameController = require('../../../controllers/FindCitiesByNameController')
const FindCitiesByStateController = require('../../../controllers/FindCitiesByStateController')
const CreateCityUseCase = require('../../../useCases/CreateCityUseCase')
const FindCitiesByNameUseCase = require('../../../useCases/FindCitiesByNameUseCase')
const FindCitiesByStateUseCase = require('../../../useCases/FindCitiesByStateUseCase')
const SQLiteCitiesRepository = require('../../repositories/SQLite/SQLiteCitiesRepository')
const expressRouterAdapter = require('../adapters/expressRouterAdapter')

const citiesRouter = Router()

const citiesRepository = new SQLiteCitiesRepository()
const createCityUseCase = new CreateCityUseCase({
  citiesRepository,
})
const createCityController = new CreateCityController({
  createCityUseCase,
})

const findCitiesByNameUseCase = new FindCitiesByNameUseCase({
  citiesRepository,
})
const findCitiesByNameController = new FindCitiesByNameController({
  findCitiesByNameUseCase,
})

const findCitiesByStateUseCase = new FindCitiesByStateUseCase({
  citiesRepository,
})
const findCitiesByStateController = new FindCitiesByStateController({
  findCitiesByStateUseCase,
})

citiesRouter.post('/cities/', expressRouterAdapter(createCityController))
citiesRouter.get('/cities/', expressRouterAdapter(findCitiesByNameController))
citiesRouter.get(
  '/uf/:state/cities/',
  expressRouterAdapter(findCitiesByStateController),
)

module.exports = citiesRouter
