const AppError = require('../core/AppError')
const FieldRequiredError = require('../core/FieldRequiredError')

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
      throw new AppError('User not found.')
    }

    await this.usersRepository.deleteById(userId)
  }
}

module.exports = DeleteUserByIdUseCase
