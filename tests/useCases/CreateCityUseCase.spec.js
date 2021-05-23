const AppError = require('../../src/core/AppError')
const City = require('../../src/domain/City')
const FakeCitiesRepository = require('../../src/infra/repositories/inMemory/FakeCitiesRepository')
const CreateCityUseCase = require('../../src/useCases/CreateCityUseCase')
const CityFactory = require('../factories/domain/CityFactory')

let createCityUseCase
let fakeCitiesRepository
let saveSpy

describe('CreateCityUseCase', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository()
    createCityUseCase = new CreateCityUseCase({
      citiesRepository: fakeCitiesRepository,
    })

    saveSpy = jest.spyOn(fakeCitiesRepository, 'save')
  })

  test('should throw if the name provided is already registered', async () => {
    const city = CityFactory.create()

    jest
      .spyOn(fakeCitiesRepository, 'findByName')
      .mockImplementationOnce(async () => [city])

    await expect(
      createCityUseCase.execute(CityFactory.createCityDTO()),
    ).rejects.toThrow(AppError)
    expect(saveSpy).not.toHaveBeenCalled()
  })

  test('should create a city if the correct values are provided', async () => {
    const useCaseResponse = await createCityUseCase.execute(
      CityFactory.createCityDTO(),
    )

    expect(useCaseResponse).toBeInstanceOf(City)
    expect(saveSpy).toHaveBeenCalled()
  })
})
