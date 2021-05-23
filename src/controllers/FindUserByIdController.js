const Controller = require('../core/Controller')

class FindUserByIdController extends Controller {
  constructor({ findUserByIdUseCase }) {
    super()
    this.findUserByIdUseCase = findUserByIdUseCase
  }

  async handle(request) {
    const { userId } = request.data

    const useCaseResponse = await this.findUserByIdUseCase.execute({ userId })

    const viewModel = {
      id: useCaseResponse.id,
      name: useCaseResponse.name,
      gender: useCaseResponse.gender,
      birthdate: useCaseResponse.birthdate,
      cityId: useCaseResponse.cityId,
    }

    return this.ok(viewModel)
  }
}

module.exports = FindUserByIdController
