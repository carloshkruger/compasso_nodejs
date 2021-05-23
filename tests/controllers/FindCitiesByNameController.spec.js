const FakeCitiesRepository = require('../../src/infra/repositories/inMemory/FakeCitiesRepository')
const FindCitiesByNameUseCase = require('../../src/useCases/FindCitiesByNameUseCase')
const FindCitiesByNameController = require('../../src/controllers/FindCitiesByNameController')
const City = require('../../src/domain/City')

let fakeCitiesRepository
let findCitiesByNameUseCase
let findCitiesByNameController

describe('FindCitiesByNameController', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository()
    findCitiesByNameUseCase = new FindCitiesByNameUseCase({
      citiesRepository: fakeCitiesRepository,
    })
    findCitiesByNameController = new FindCitiesByNameController({
      findCitiesByNameUseCase,
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
      .spyOn(fakeCitiesRepository, 'findByName')
      .mockImplementationOnce(async () => [city1, city2])

    const useCaseExecuteSpy = jest.spyOn(findCitiesByNameUseCase, 'execute')
    const name = 'rio'

    const controllerResponse = await findCitiesByNameController.execute({
      data: {
        name,
      },
    })

    expect(controllerResponse.statusCode).toBe(200)
    expect(controllerResponse.data.length).toBe(2)
    expect(useCaseExecuteSpy).toHaveBeenCalledWith({ name })
  })
})
