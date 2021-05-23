const FieldRequiredError = require('../core/FieldRequiredError')
const ResourceNotFoundError = require('../core/ResourceNotFoundError')

class DeleteUserByIdUseCase {
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

    await this.usersRepository.deleteById(userId)
  }
}

module.exports = DeleteUserByIdUseCase
