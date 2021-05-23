const FieldRequiredError = require('../core/FieldRequiredError')
const ResourceNotFoundError = require('../core/ResourceNotFoundError')

class FindUserByIdUseCase {
  constructor({ usersRepository }) {
    this.usersRepository = usersRepository
  }

  async execute({ userId }) {
    if (!userId) {
      throw new FieldRequiredError('User id')
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError('User')
    }

    return user
  }
}

module.exports = FindUserByIdUseCase
