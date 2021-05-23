const FindUsersByNameController = require('../../src/controllers/FindUsersByNameController')
const FakeUsersRepository = require('../../src/infra/repositories/inMemory/FakeUsersRepository')
const FindUsersByNameUseCase = require('../../src/useCases/FindUsersByNameUseCase')
const UserFactory = require('../factories/domain/UserFactory')

let fakeUsersRepository
let findUsersByNameUseCase
let findUsersByNameController

describe('FindUsersByNameController', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    findUsersByNameUseCase = new FindUsersByNameUseCase({
      usersRepository: fakeUsersRepository,
    })
    findUsersByNameController = new FindUsersByNameController({
      findUsersByNameUseCase,
    })
  })

  test('should return statusCode 200 on success with an list', async () => {
    const user = UserFactory.create()

    jest
      .spyOn(findUsersByNameUseCase, 'execute')
      .mockImplementation(async () => [user])

    const useCaseExecuteSpy = jest.spyOn(findUsersByNameUseCase, 'execute')

    const controllerResponse = await findUsersByNameController.execute({
      data: {
        name: user.name,
      },
    })

    expect(controllerResponse.statusCode).toBe(200)
    expect(controllerResponse.data.length).toBe(1)
    expect(useCaseExecuteSpy).toHaveBeenCalledWith({
      name: user.name,
    })
  })
})
