const Controller = require('../core/Controller')

class FindUsersByNameController extends Controller {
  constructor({ findUsersByNameUseCase }) {
    super()

    this.findUsersByNameUseCase = findUsersByNameUseCase
  }

  async handle(request) {
    const { name } = request.data

    const useCaseResponse = await this.findUsersByNameUseCase.execute({ name })

    const viewModel = useCaseResponse.map((user) => ({
      id: user.id,
      name: user.name,
      gender: user.gender,
      birthdate: user.birthdate,
      cityId: user.cityId,
    }))

    return this.ok(viewModel)
  }
}

module.exports = FindUsersByNameController
