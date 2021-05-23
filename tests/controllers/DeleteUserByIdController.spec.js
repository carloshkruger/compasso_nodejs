const FakeUsersRepository = require('../../src/infra/repositories/inMemory/FakeUsersRepository')
const DeleteUserByIdUseCase = require('../../src/useCases/DeleteUserByIdUseCase')
const DeleteUserByIdController = require('../../src/controllers/DeleteUserByIdController')
const UniqueId = require('../../src/core/UniqueId')

let fakeUsersRepository
let deleteUserByIdUseCase
let deleteUserByIdController

describe('CreateUserController', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    deleteUserByIdUseCase = new DeleteUserByIdUseCase({
      usersRepository: fakeUsersRepository,
    })
    deleteUserByIdController = new DeleteUserByIdController({
      deleteUserByIdUseCase,
    })
  })

  test('should return statusCode 204 on success with no data', async () => {
    jest
      .spyOn(deleteUserByIdUseCase, 'execute')
      .mockImplementation(async () => undefined)

    const useCaseExecuteSpy = jest.spyOn(deleteUserByIdUseCase, 'execute')

    const userId = new UniqueId().value

    const controllerResponse = await deleteUserByIdController.execute({
      data: {
        userId,
      },
    })

    expect(controllerResponse.statusCode).toBe(204)
    expect(controllerResponse.data).toBeFalsy()
    expect(useCaseExecuteSpy).toHaveBeenCalledWith(userId)
  })
})
