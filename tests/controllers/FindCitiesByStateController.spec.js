const FakeCitiesRepository = require('../../src/infra/repositories/inMemory/FakeCitiesRepository')
const FindCitiesByStateUseCase = require('../../src/useCases/FindCitiesByStateUseCase')
const FindCitiesByStateController = require('../../src/controllers/FindCitiesByStateController')
const City = require('../../src/domain/City')

let fakeCitiesRepository
let findCitiesByStateUseCase
let findCitiesByStateController

describe('FindCitiesByStateController', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository()
    findCitiesByStateUseCase = new FindCitiesByStateUseCase({
      citiesRepository: fakeCitiesRepository,
    })
    findCitiesByStateController = new FindCitiesByStateController({
      findCitiesByStateUseCase,
    })
  })

  test('should return statusCode 200 and an list on success', async () => {
    const city1 = new City({
      name: 'Rio Negrinho',
      state: 'SC',
    })

    const city2 = new City({
      name: 'Rio do Sul',
      state: 'SC',
    })

    jest
      .spyOn(fakeCitiesRepository, 'findByState')
      .mockImplementationOnce(async () => [city1, city2])

    const useCaseExecuteSpy = jest.spyOn(findCitiesByStateUseCase, 'execute')
    const state = 'SC'

    const controllerResponse = await findCitiesByStateController.execute({
      data: {
        state,
      },
    })

    expect(controllerResponse.statusCode).toBe(200)
    expect(controllerResponse.data.length).toBe(2)
    expect(useCaseExecuteSpy).toHaveBeenCalledWith({ state })
  })
})
