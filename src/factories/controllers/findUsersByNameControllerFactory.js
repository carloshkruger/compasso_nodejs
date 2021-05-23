const FindUsersByNameController = require('../../controllers/FindUsersByNameController')
const findUsersByNameUseCaseFactory = require('../useCases/findUsersByNameUseCaseFactory')

module.exports = () => {
  const findUsersByNameController = new FindUsersByNameController({
    findUsersByNameUseCase: findUsersByNameUseCaseFactory(),
  })

  return findUsersByNameController
}
