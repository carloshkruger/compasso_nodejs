const FindUserByIdUseCase = require('../../src/useCases/FindUserByIdUseCase')
const FakeUsersRepository = require('../../src/infra/repositories/inMemory/FakeUsersRepository')
const AppError = require('../../src/core/AppError')
const UniqueId = require('../../src/core/UniqueId')
const User = require('../../src/domain/User')
const UserFactory = require('../factories/domain/UserFactory')
const ResourceNotFoundError = require('../../src/core/ResourceNotFoundError')

let fakeUsersRepository
let findUserByIdUseCase

describe('FindUserByIdUseCase', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    findUserByIdUseCase = new FindUserByIdUseCase({
      usersRepository: fakeUsersRepository,
    })
  })

  test('should throw if user is is not provided', async () => {
    await expect(findUserByIdUseCase.execute({ userId: '' })).rejects.toThrow(
      AppError,
    )
  })

  test('should throw if user not found', async () => {
    jest
      .spyOn(fakeUsersRepository, 'findById')
      .mockImplementationOnce(async () => undefined)

    const userId = new UniqueId().value

    await expect(findUserByIdUseCase.execute({ userId })).rejects.toThrow(
      ResourceNotFoundError,
    )
  })

  test('should return an user if exists', async () => {
    const user = UserFactory.create()

    jest
      .spyOn(fakeUsersRepository, 'findById')
      .mockImplementationOnce(async () => user)

    const useCaseResponse = await findUserByIdUseCase.execute({
      userId: user.id,
    })

    expect(useCaseResponse).toBeInstanceOf(User)
  })
})
