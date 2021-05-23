const AppError = require("../../src/core/AppError")
const FieldRequiredError = require("../../src/core/FieldRequiredError")
const City = require("../../src/domain/City")
const FakeCitiesRepository = require("../../src/infra/repositories/inMemory/FakeCitiesRepository")
const FindCitiesByStateUseCase = require("../../src/useCases/FindCitiesByStateUseCase")

let fakeCitiesRepository
let findCitiesByStateUseCase

describe('FindCitiesByStateUseCase', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository()
    findCitiesByStateUseCase = new FindCitiesByStateUseCase({
      citiesRepository: fakeCitiesRepository
    })
  })

  test('should throw if state was not provided', async () => {
    await expect(findCitiesByStateUseCase.execute({state: ''})).rejects.toThrow(FieldRequiredError)
  })

  test('should return an empty list if no city was found', async () => {
    jest.spyOn(fakeCitiesRepository, 'findByState').mockImplementationOnce(async () => [])

    const useCaseResponse = await findCitiesByStateUseCase.execute({state: 'SC'})

    expect(useCaseResponse.length).toBe(0)
  })

  test('should return a list of cities', async () => {
    const city1 = new City({
      name: 'Aurora',
      state: 'SC'
    })

    const city2 = new City({
      name: 'Rio do Sul',
      state: 'SC'
    })

    jest.spyOn(fakeCitiesRepository, 'findByState').mockImplementationOnce(async () => [city1, city2])

    const useCaseResponse = await findCitiesByStateUseCase.execute({state: 'SC'})

    expect(useCaseResponse.length).toBe(2)
  })
})