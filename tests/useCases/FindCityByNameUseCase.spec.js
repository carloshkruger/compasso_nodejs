const AppError = require('../../src/core/AppError')
const FindCityByNameUseCase = require("../../src/useCases/FindCityByNameUseCase")
const FakeCitiesRepository = require('../../src/infra/repositories/inMemory/FakeCitiesRepository')
const FieldRequiredError = require('../../src/core/FieldRequiredError')
const City = require('../../src/domain/City')

let fakeCitiesRepository
let findCityByNameUseCase

describe('FindCityByNameUseCase', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository()
    findCityByNameUseCase = new FindCityByNameUseCase({
      citiesRepository: fakeCitiesRepository
    })
  })

  test('should throw if the city name is not provided', async () => {
    jest.spyOn(fakeCitiesRepository, 'findByName').mockImplementationOnce(async () => undefined)

    await expect(findCityByNameUseCase.execute({ name: '' })).rejects.toThrow(FieldRequiredError)
  })

  test('should throw if the city was not found', async () => {
    jest.spyOn(fakeCitiesRepository, 'findByName').mockImplementationOnce(async () => undefined)

    await expect(findCityByNameUseCase.execute({ name: 'city not registered' })).rejects.toThrow(AppError)
  })

  test('should return a city if exists', async () => {
    const cityMock = new City({
      name: 'Aurora',
      state: 'SC'
    })

    jest.spyOn(fakeCitiesRepository, 'findByName').mockImplementationOnce(async () => cityMock)

    const useCaseResponse = await findCityByNameUseCase.execute({ name: cityMock.name })

    expect(useCaseResponse).toBeInstanceOf(City)
  })
})