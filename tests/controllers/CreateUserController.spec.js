const FakeCitiesRepository = require('../../src/infra/repositories/inMemory/FakeCitiesRepository')
const FakeUsersRepository = require('../../src/infra/repositories/inMemory/FakeUsersRepository')
const CreateUserUseCase = require('../../src/useCases/CreateUserUseCase')
const CreateUserController = require('../../src/controllers/CreateUserController')
const UniqueId = require('../../src/core/UniqueId')
const User = require('../../src/domain/User')

let fakeCitiesRepository
let fakeUsersRepository
let createUserUseCase
let createUserController

const userDTO = {
  name: 'user name',
  gender: 'gender',
  birthdate: new Date(),
  cityId: new UniqueId().value,
}

describe('CreateUserController', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository()
    fakeUsersRepository = new FakeUsersRepository()
    createUserUseCase = new CreateUserUseCase({
      citiesRepository: fakeCitiesRepository,
      usersRepository: fakeUsersRepository,
    })
    createUserController = new CreateUserController({
      createUserUseCase,
    })
  })

  test('should return statusCode 201 and id on success', async () => {
    const user = new User(userDTO)

    jest
      .spyOn(createUserUseCase, 'execute')
      .mockImplementation(async () => user)

    const controllerResponse = await createUserController.execute({
      data: userDTO,
    })

    expect(controllerResponse.statusCode).toBe(201)
    expect(controllerResponse.data.id).toBeTruthy()
  })
})
