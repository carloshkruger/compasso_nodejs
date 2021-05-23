const FakeCitiesRepository = require('../../src/infra/repositories/inMemory/FakeCitiesRepository')
const CreateCityUseCase = require('../../src/useCases/CreateCityUseCase')
const CreateCityController = require('../../src/controllers/CreateCityController')
const CityFactory = require('../factories/domain/CityFactory')

let fakeCitiesRepository
let createCityUseCase
let createCityController

describe('CreateCityController', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository()
    createCityUseCase = new CreateCityUseCase({
      citiesRepository: fakeCitiesRepository,
    })
    createCityController = new CreateCityController({
      createCityUseCase,
    })
  })

  test('should return statusCode 201 and id on success', async () => {
    const controllerResponse = await createCityController.execute({
      data: CityFactory.createCityDTO(),
    })

    expect(controllerResponse.statusCode).toBe(201)
    expect(controllerResponse.data.id).toBeTruthy()
  })
})
