const FieldRequiredError = require('../core/FieldRequiredError')

class FindUsersByNameUseCase {
  constructor({ usersRepository }) {
    this.usersRepository = usersRepository
  }

  async execute({ name }) {
    if (!name) {
      throw new FieldRequiredError('User name')
    }

    const users = await this.usersRepository.findByName(name)

    return users
  }
}

module.exports = FindUsersByNameUseCase
