const Controller = require('../core/Controller')

class DeleteUserByIdController extends Controller {
  constructor({ deleteUserByIdUseCase }) {
    super()
    this.deleteUserByIdUseCase = deleteUserByIdUseCase
  }

  async handle(request) {
    const { userId } = request.data

    await this.deleteUserByIdUseCase.execute(userId)

    return this.noContent()
  }
}

module.exports = DeleteUserByIdController
