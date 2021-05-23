const FakeUsersRepository = require('../../src/infra/repositories/inMemory/FakeUsersRepository')
const UpdateUserNameUseCase = require('../../src/useCases/UpdateUserNameUseCase')
const UpdateUserNameController = require('../../src/controllers/UpdateUserNameController')
const UserFactory = require('../factories/domain/UserFactory')

let fakeUsersRepository
let updateUserNameUseCase
let updateUserNameController

describe('UpdateUserNameController', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    updateUserNameUseCase = new UpdateUserNameUseCase({
      usersRepository: fakeUsersRepository,
    })
    updateUserNameController = new UpdateUserNameController({
      updateUserNameUseCase,
    })
  })

  test('should return statusCode 204 on success with no data', async () => {
    const user = UserFactory.create()

    jest
      .spyOn(updateUserNameUseCase, 'execute')
      .mockImplementation(async () => user)

    const useCaseExecuteSpy = jest.spyOn(updateUserNameUseCase, 'execute')

    const userId = user.id
    const newName = 'new user name'

    const controllerResponse = await updateUserNameController.execute({
      data: {
        userId,
        name: newName,
      },
    })

    expect(controllerResponse.statusCode).toBe(204)
    expect(controllerResponse.data).toBeFalsy()
    expect(useCaseExecuteSpy).toHaveBeenCalledWith({ userId, name: newName })
  })
})
