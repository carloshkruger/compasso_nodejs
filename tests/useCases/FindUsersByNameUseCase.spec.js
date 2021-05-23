const FieldRequiredError = require('../../src/core/FieldRequiredError')
const FakeUsersRepository = require('../../src/infra/repositories/inMemory/FakeUsersRepository')
const FindUsersByNameUseCase = require('../../src/useCases/FindUsersByNameUseCase')
const UserFactory = require('../factories/domain/UserFactory')

let fakeUsersRepository
let findUsersByNameUseCase

describe('FindUsersByNameUseCase', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    findUsersByNameUseCase = new FindUsersByNameUseCase({
      usersRepository: fakeUsersRepository,
    })
  })

  test('should throw if the user name is not provided', async () => {
    await expect(findUsersByNameUseCase.execute({ name: '' })).rejects.toThrow(
      FieldRequiredError,
    )
  })

  test('should return an empty list if no user was found', async () => {
    jest
      .spyOn(fakeUsersRepository, 'findByName')
      .mockImplementationOnce(async () => [])

    const useCaseResponse = await findUsersByNameUseCase.execute({
      name: 'user name',
    })

    expect(useCaseResponse.length).toBe(0)
  })

  test('should return a list of users', async () => {
    const user = UserFactory.create()

    jest
      .spyOn(fakeUsersRepository, 'findByName')
      .mockImplementationOnce(async () => [user])

    const useCaseResponse = await findUsersByNameUseCase.execute({
      name: user.name,
    })

    expect(useCaseResponse.length).toBe(1)
  })
})
