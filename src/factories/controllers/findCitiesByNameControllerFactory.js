const FindCitiesByNameController = require('../../controllers/FindCitiesByNameController')
const findCitiesByNameUseCaseFactory = require('../useCases/findCitiesByNameUseCaseFactory')

module.exports = () => {
  const findCitiesByNameController = new FindCitiesByNameController({
    findCitiesByNameUseCase: findCitiesByNameUseCaseFactory(),
  })

  return findCitiesByNameController
}
