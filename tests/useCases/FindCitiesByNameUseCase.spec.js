const AppError = require('../../src/core/AppError')
const FindCitiesByNameUseCase = require('../../src/useCases/FindCitiesByNameUseCase')
const FakeCitiesRepository = require('../../src/infra/repositories/inMemory/FakeCitiesRepository')
const FieldRequiredError = require('../../src/core/FieldRequiredError')
const City = require('../../src/domain/City')

let fakeCitiesRepository
let findCitiesByNameUseCase

describe('FindCitiesByNameUseCase', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository()
    findCitiesByNameUseCase = new FindCitiesByNameUseCase({
      citiesRepository: fakeCitiesRepository,
    })
  })

  test('should throw if the city name is not provided', async () => {
    jest
      .spyOn(fakeCitiesRepository, 'findByName')
      .mockImplementationOnce(async () => undefined)

    await expect(findCitiesByNameUseCase.execute({ name: '' })).rejects.toThrow(
      FieldRequiredError,
    )
  })

  test('should return an empty list if no city was found', async () => {
    jest
      .spyOn(fakeCitiesRepository, 'findByName')
      .mockImplementationOnce(async () => [])

    const useCaseResponse = await findCitiesByNameUseCase.execute({
      name: 'Rio',
    })

    expect(useCaseResponse.length).toBe(0)
  })

  test('should return a list of cities', async () => {
    const city1 = new City({
      name: 'Rio Negrinho',
      state: 'SC',
    })

    const city2 = new City({
      name: 'Rio do Sul',
      state: 'SC',
    })

    jest
      .spyOn(fakeCitiesRepository, 'findByName')
      .mockImplementationOnce(async () => [city1, city2])

    const useCaseResponse = await findCitiesByNameUseCase.execute({
      name: 'Rio',
    })

    expect(useCaseResponse.length).toBe(2)
  })
})
