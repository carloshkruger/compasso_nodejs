const AppError = require('../../src/core/AppError')
const City = require('../../src/domain/City')
const FakeCitiesRepository = require('../../src/infra/repositories/inMemory/FakeCitiesRepository')
const CreateCityUseCase = require('../../src/useCases/CreateCityUseCase')

let createCityUseCase
let fakeCitiesRepository
let saveSpy

const cityDTO = {
  name: 'Aurora',
  state: 'SC',
}

describe('CreateCityUseCase', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository()
    createCityUseCase = new CreateCityUseCase({
      citiesRepository: fakeCitiesRepository,
    })

    saveSpy = jest.spyOn(fakeCitiesRepository, 'save')
  })

  test('should throw if the name provided is already registered', async () => {
    const city = new City(cityDTO)

    jest
      .spyOn(fakeCitiesRepository, 'findByName')
      .mockImplementationOnce(async () => [city])

    await expect(createCityUseCase.execute(cityDTO)).rejects.toThrow(AppError)
    expect(saveSpy).not.toHaveBeenCalled()
  })

  test('should create a city if the correct values are provided', async () => {
    const useCaseResponse = await createCityUseCase.execute(cityDTO)

    expect(useCaseResponse).toBeInstanceOf(City)
    expect(saveSpy).toHaveBeenCalled()
  })
})
