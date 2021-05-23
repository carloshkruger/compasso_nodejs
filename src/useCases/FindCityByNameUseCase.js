const AppError = require("../core/AppError")
const FieldRequiredError = require("../core/FieldRequiredError")

class FindCityByNameUseCase {
  constructor({ citiesRepository }) {
    this.citiesRepository = citiesRepository
  }

  async execute({ name }) {
    if (!name) {
      throw new FieldRequiredError('City name')
    }

    const city = await this.citiesRepository.findByName(name)

    if (!city) {
      throw new AppError(`City "${name}" not found.`)
    }

    return city
  }
}

module.exports = FindCityByNameUseCase