const AppError = require('../core/AppError')
const City = require('../domain/City')

class CreateCityUseCase {
  constructor({ citiesRepository }) {
    this.citiesRepository = citiesRepository
  }

  async execute({ name, state }) {
    const city = new City({
      name,
      state,
    })

    const citiesFromRepository = await this.citiesRepository.findByName(name)

    if (citiesFromRepository.length > 0) {
      throw new AppError(`The name "${name}" is already registered.`)
    }

    await this.citiesRepository.save(city)

    return city
  }
}

module.exports = CreateCityUseCase
