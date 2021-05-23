const AppError = require("../core/AppError")
const FieldRequiredError = require("../core/FieldRequiredError")

class UpdateUserNameUseCase {
  constructor({ usersRepository }) {
    this.usersRepository = usersRepository
  }

  async execute({ userId, name }) {
    if (!userId) {
      throw new FieldRequiredError('User id')
    }

    if (!name) {
      throw new FieldRequiredError('Name')
    }
  
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found.')
    }

    user.updateName(name)

    await this.usersRepository.save(user)
  }
}

module.exports = UpdateUserNameUseCase