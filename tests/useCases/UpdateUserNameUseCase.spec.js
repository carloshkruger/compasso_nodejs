const FieldRequiredError = require('../../src/core/FieldRequiredError')
const ResourceNotFoundError = require('../../src/core/ResourceNotFoundError')
const UniqueId = require('../../src/core/UniqueId')
const User = require('../../src/domain/User')
const FakeUsersRepository = require('../../src/infra/repositories/inMemory/FakeUsersRepository')
const UpdateUserNameUseCase = require('../../src/useCases/UpdateUserNameUseCase')
const UserFactory = require('../factories/domain/UserFactory')

let fakeUsersRepository
let updateUserNameUseCase
let useCaseDTO

describe('UpdateUserNameUseCase', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    updateUserNameUseCase = new UpdateUserNameUseCase({
      usersRepository: fakeUsersRepository,
    })

    useCaseDTO = {
      userId: new UniqueId().value,
      name: 'new user name',
    }
  })

  test('should throw if the user id is not provided', async () => {
    useCaseDTO.userId = ''

    await expect(updateUserNameUseCase.execute(useCaseDTO)).rejects.toThrow(
      FieldRequiredError,
    )
  })

  test('should throw if the name is not provided', async () => {
    useCaseDTO.name = ''

    await expect(updateUserNameUseCase.execute(useCaseDTO)).rejects.toThrow(
      FieldRequiredError,
    )
  })

  test('should throw if user was not found', async () => {
    jest
      .spyOn(fakeUsersRepository, 'findById')
      .mockImplementationOnce(async () => undefined)

    await expect(updateUserNameUseCase.execute(useCaseDTO)).rejects.toThrow(
      ResourceNotFoundError,
    )
  })

  test('should update the user name', async () => {
    const user = UserFactory.create()

    jest
      .spyOn(fakeUsersRepository, 'findById')
      .mockImplementationOnce(async () => user)

    const saveUserSpy = jest.spyOn(fakeUsersRepository, 'save')
    const updateUserNameSpy = jest.spyOn(User.prototype, 'updateName')
    const newUserName = 'new user name'

    const useCaseResponse = await updateUserNameUseCase.execute({
      userId: user.id,
      name: newUserName,
    })

    expect(useCaseResponse).toBeFalsy()
    expect(updateUserNameSpy).toHaveBeenCalledWith(newUserName)
    expect(saveUserSpy).toHaveBeenCalled()
  })
})
