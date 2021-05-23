const Controller = require('../core/Controller')

class UpdateUserNameController extends Controller {
  constructor({ updateUserNameUseCase }) {
    super()
    this.updateUserNameUseCase = updateUserNameUseCase
  }

  async handle(request) {
    const { userId, name } = request.data

    await this.updateUserNameUseCase.execute({ userId, name })

    return this.noContent()
  }
}

module.exports = UpdateUserNameController
