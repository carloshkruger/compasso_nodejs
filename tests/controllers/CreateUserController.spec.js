const FakeCitiesRepository = require('../../src/infra/repositories/inMemory/FakeCitiesRepository')
const FakeUsersRepository = require('../../src/infra/repositories/inMemory/FakeUsersRepository')
const CreateUserUseCase = require('../../src/useCases/CreateUserUseCase')
const CreateUserController = require('../../src/controllers/CreateUserController')
const UserFactory = require('../factories/domain/UserFactory')

let fakeCitiesRepository
let fakeUsersRepository
let createUserUseCase
let createUserController

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
    const user = UserFactory.create()

    jest
      .spyOn(createUserUseCase, 'execute')
      .mockImplementation(async () => user)

    const controllerResponse = await createUserController.execute({
      data: UserFactory.createUserDTO(),
    })

    expect(controllerResponse.statusCode).toBe(201)
    expect(controllerResponse.data.id).toBeTruthy()
  })
})
