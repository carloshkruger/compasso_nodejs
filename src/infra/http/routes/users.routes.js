const { Router } = require('express')
const CitiesRepository = require('../../repositories/SQLite/SQLiteCitiesRepository')
const UsersRepository = require('../../repositories/SQLite/SQLiteUsersRepository')
const CreateUserUseCase = require('../../../useCases/CreateUserUseCase')
const UpdateUserNameUseCase = require('../../../useCases/UpdateUserNameUseCase')
const DeleteUserByIdUseCase = require('../../../useCases/DeleteUserByIdUseCase')
const CreateUserController = require('../../../controllers/CreateUserController')
const UpdateUserNameController = require('../../../controllers/UpdateUserNameController')
const DeleteUserByIdController = require('../../../controllers/DeleteUserByIdController')
const expressRouterAdapter = require('../adapters/expressRouterAdapter')

const usersRouter = Router()

const usersRepository = new UsersRepository()
const citiesRepository = new CitiesRepository()

const createUserUseCase = new CreateUserUseCase({
  usersRepository,
  citiesRepository,
})
const createUserController = new CreateUserController({
  createUserUseCase,
})

const updateUserNameUseCase = new UpdateUserNameUseCase({
  usersRepository,
})
const updateUserNameController = new UpdateUserNameController({
  updateUserNameUseCase,
})

const deleteUserByIdUseCase = new DeleteUserByIdUseCase({
  usersRepository,
})
const deleteUserByIdController = new DeleteUserByIdController({
  deleteUserByIdUseCase,
})

usersRouter.post('/users/', expressRouterAdapter(createUserController))
usersRouter.delete(
  '/users/:userId',
  expressRouterAdapter(deleteUserByIdController),
)
usersRouter.patch(
  '/users/:userId/name',
  expressRouterAdapter(updateUserNameController),
)

module.exports = usersRouter
