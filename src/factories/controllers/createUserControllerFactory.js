const CreateUserController = require('../../controllers/CreateUserController')
const createUserUseCaseFactory = require('../useCases/createUserUseCaseFactory')

module.exports = () => {
  const createUserController = new CreateUserController({
    createUserUseCase: createUserUseCaseFactory(),
  })

  return createUserController
}
