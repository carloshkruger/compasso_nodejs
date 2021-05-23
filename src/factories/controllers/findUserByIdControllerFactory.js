const FindUserByIdController = require('../../controllers/FindUserByIdController')
const findUserByIdUseCaseFactory = require('../useCases/findUserByIdUseCaseFactory')

module.exports = () => {
  const findUserByIdController = new FindUserByIdController({
    findUserByIdUseCase: findUserByIdUseCaseFactory(),
  })

  return findUserByIdController
}
