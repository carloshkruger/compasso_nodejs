const FieldRequiredError = require('../core/FieldRequiredError')

class FindCitiesByNameUseCase {
  constructor({ citiesRepository }) {
    this.citiesRepository = citiesRepository
  }

  async execute({ name }) {
    if (!name) {
      throw new FieldRequiredError('City name')
    }

    const cities = await this.citiesRepository.findByName(name)

    return cities
  }
}

module.exports = FindCitiesByNameUseCase
