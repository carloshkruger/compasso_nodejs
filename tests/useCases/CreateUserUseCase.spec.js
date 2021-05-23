const AppError = require('../../src/core/AppError')
const User = require('../../src/domain/User')
const CreateUserUseCase = require('../../src/useCases/CreateUserUseCase')
const FakeCitiesRepository = require('../../src/infra/repositories/inMemory/FakeCitiesRepository')
const FakeUsersRepository = require('../../src/infra/repositories/inMemory/FakeUsersRepository')
const UserFactory = require('../factories/domain/UserFactory')
const CityFactory = require('../factories/domain/CityFactory')
const ResourceNotFoundError = require('../../src/core/ResourceNotFoundError')

let fakeCitiesRepository
let fakeUsersRepository
let createUserUseCase
let saveUserSpy

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository()
    fakeUsersRepository = new FakeUsersRepository()
    createUserUseCase = new CreateUserUseCase({
      usersRepository: fakeUsersRepository,
      citiesRepository: fakeCitiesRepository,
    })

    saveUserSpy = jest.spyOn(fakeUsersRepository, 'save')
  })

  test('should throw if the city provided does not exists', async () => {
    jest
      .spyOn(fakeCitiesRepository, 'findById')
      .mockImplementationOnce(async () => undefined)

    await expect(
      createUserUseCase.execute(UserFactory.createUserDTO()),
    ).rejects.toThrow(ResourceNotFoundError)
    expect(saveUserSpy).not.toHaveBeenCalled()
  })

  test('should create an user if the values are correct', async () => {
    jest
      .spyOn(fakeCitiesRepository, 'findById')
      .mockImplementationOnce(async () => CityFactory.create())

    const useCaseResponse = await createUserUseCase.execute(
      UserFactory.createUserDTO(),
    )

    expect(useCaseResponse).toBeInstanceOf(User)
    expect(saveUserSpy).toHaveBeenCalled()
  })
})
