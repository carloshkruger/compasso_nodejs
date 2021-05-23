const ResourceNotFoundError = require('../core/ResourceNotFoundError')
const User = require('../domain/User')

class CreateUserUseCase {
  constructor({ usersRepository, citiesRepository }) {
    this.usersRepository = usersRepository
    this.citiesRepository = citiesRepository
  }

  async execute({ name, gender, birthdate, cityId }) {
    const user = new User({
      name,
      gender,
      birthdate,
      cityId,
    })

    const city = await this.citiesRepository.findById(cityId)

    if (!city) {
      throw new ResourceNotFoundError('City')
    }

    await this.usersRepository.save(user)

    return user
  }
}

module.exports = CreateUserUseCase
