const FakeUsersRepository = require('../../src/infra/repositories/inMemory/FakeUsersRepository')
const FindUserByIdUseCase = require('../../src/useCases/FindUserByIdUseCase')
const FindUserByIdController = require('../../src/controllers/FindUserByIdController')
const UniqueId = require('../../src/core/UniqueId')
const UserFactory = require('../factories/domain/UserFactory')

let fakeUsersRepository
let findUserByIdUseCase
let findUserByIdController

describe('CreateUserController', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    findUserByIdUseCase = new FindUserByIdUseCase({
      usersRepository: fakeUsersRepository,
    })
    findUserByIdController = new FindUserByIdController({
      findUserByIdUseCase,
    })
  })

  test('should return statusCode 200 on success with the user data', async () => {
    const user = UserFactory.create()

    jest
      .spyOn(findUserByIdUseCase, 'execute')
      .mockImplementation(async () => user)

    const useCaseExecuteSpy = jest.spyOn(findUserByIdUseCase, 'execute')

    const userId = new UniqueId().value

    const controllerResponse = await findUserByIdController.execute({
      data: {
        userId,
      },
    })

    expect(controllerResponse.statusCode).toBe(200)
    expect(controllerResponse.data).toBeTruthy()
    expect(useCaseExecuteSpy).toHaveBeenCalledWith({ userId })
  })
})
