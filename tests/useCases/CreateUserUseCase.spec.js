const AppError = require("../../src/core/AppError")
const UniqueId = require("../../src/core/UniqueId")
const User = require('../../src/domain/User')
const CreateUserUseCase = require("../../src/useCases/CreateUserUseCase")
const FakeCitiesRepository = require('../../src/infra/repositories/inMemory/FakeCitiesRepository')
const FakeUsersRepository = require('../../src/infra/repositories/inMemory/FakeUsersRepository')

let fakeCitiesRepository
let fakeUsersRepository
let createUserUseCase
let saveUserSpy

const userDTO = {
  name: 'Valid user name',
  gender: 'valid gender',
  birthdate: new Date(),
  cityId: new UniqueId().value,
}

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
    jest.spyOn(fakeCitiesRepository, 'findById').mockImplementationOnce(async () => undefined)

    await expect(createUserUseCase.execute(userDTO)).rejects.toThrow(AppError)
    expect(saveUserSpy).not.toHaveBeenCalled()
  })

  test('should create an user if the values are correct', async () => {
    const city = {
      name: 'Aurora',
      state: 'SC'
    }

    jest.spyOn(fakeCitiesRepository, 'findById').mockImplementationOnce(async () => city)

    const useCaseResponse = await createUserUseCase.execute(userDTO)

    expect(useCaseResponse).toBeInstanceOf(User)
    expect(saveUserSpy).toHaveBeenCalled()
  })
})