const AppError = require('../core/AppError')
const FieldRequiredError = require('../core/FieldRequiredError')

class FindCitiesByStateUseCase {
  constructor({ citiesRepository }) {
    this.citiesRepository = citiesRepository
  }

  async execute({ state }) {
    if (!state) {
      throw new FieldRequiredError('State')
    }

    const cities = await this.citiesRepository.findByState(state)

    return cities
  }
}

module.exports = FindCitiesByStateUseCase
