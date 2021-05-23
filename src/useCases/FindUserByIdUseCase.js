const AppError = require('../core/AppError')
const FieldRequiredError = require('../core/FieldRequiredError')

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
      throw new AppError('User not found.')
    }

    return user
  }
}

module.exports = FindUserByIdUseCase
