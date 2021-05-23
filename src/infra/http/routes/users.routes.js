const { Router } = require('express')
const expressRouterAdapter = require('../adapters/expressRouterAdapter')
const createUserControllerFactory = require('../../../factories/controllers/createUserControllerFactory')
const updateUserNameControllerFactory = require('../../../factories/controllers/updateUserNameControllerFactory')
const deleteUserByIdControllerFactory = require('../../../factories/controllers/deleteUserByIdControllerFactory')

const usersRouter = Router()

usersRouter.post('/users/', expressRouterAdapter(createUserControllerFactory()))
usersRouter.delete(
  '/users/:userId',
  expressRouterAdapter(deleteUserByIdControllerFactory()),
)
usersRouter.patch(
  '/users/:userId/name',
  expressRouterAdapter(updateUserNameControllerFactory()),
)

module.exports = usersRouter
