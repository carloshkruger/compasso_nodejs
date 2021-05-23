const FindCitiesByStateController = require('../../controllers/FindCitiesByStateController')
const findCitiesByStateUseCaseFactory = require('../useCases/findCitiesByStateUseCaseFactory')

module.exports = () => {
  const findCitiesByStateController = new FindCitiesByStateController({
    findCitiesByStateUseCase: findCitiesByStateUseCaseFactory(),
  })

  return findCitiesByStateController
}
