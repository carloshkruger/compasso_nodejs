const DeleteUserByIdController = require('../../controllers/DeleteUserByIdController')
const deleteUserByIdUseCaseFactory = require('../useCases/deleteUserByIdUseCaseFactory')

module.exports = () => {
  const deleteUserByIdController = new DeleteUserByIdController({
    deleteUserByIdUseCase: deleteUserByIdUseCaseFactory(),
  })

  return deleteUserByIdController
}
