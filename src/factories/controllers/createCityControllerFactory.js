const CreateCityController = require('../../controllers/CreateCityController')
const createCityUseCaseFactory = require('../useCases/createCityUseCaseFactory')

module.exports = () => {
  const createCityController = new CreateCityController({
    createCityUseCase: createCityUseCaseFactory(),
  })

  return createCityController
}
