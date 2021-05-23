const UniqueId = require('../../src/core/UniqueId')
const DeleteUserByIdUseCase = require('../../src/useCases/DeleteUserByIdUseCase')
const FakeUsersRepository = require('../../src/infra/repositories/inMemory/FakeUsersRepository')
const FieldRequiredError = require('../../src/core/FieldRequiredError')
const AppError = require('../../src/core/AppError')
const User = require('../../src/domain/User')

let fakeUsersRepository
let deleteUserByIdUseCase

describe('DeleteUserByIdUseCase', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    deleteUserByIdUseCase = new DeleteUserByIdUseCase({
      usersRepository: fakeUsersRepository
    })
  })

  test('should throw if the user id is not provided', async () => {
    await expect(deleteUserByIdUseCase.execute({ userId: '' })).rejects.toThrow(FieldRequiredError)
  })

  test('should throw if the user does not exists', async () => {
    jest.spyOn(fakeUsersRepository, 'findById').mockImplementationOnce(async () => undefined)

    const userId = new UniqueId().value

    await expect(deleteUserByIdUseCase.execute({ userId })).rejects.toThrow(AppError)
  })

  test('should delete an user', async () => {
    const user = new User({
      name: 'Valid user name',
      gender: 'valid gender',
      birthdate: new Date(),
      cityId: new UniqueId().value,
    })

    jest.spyOn(fakeUsersRepository, 'findById').mockImplementationOnce(async () => user)

    const deleteUserSpy = jest.spyOn(fakeUsersRepository, 'deleteById')
    const userId = user.id

    const useCaseResponse = await deleteUserByIdUseCase.execute({ userId })

    expect(useCaseResponse).toBeFalsy()
    expect(deleteUserSpy).toHaveBeenCalledWith(userId)
  })
})