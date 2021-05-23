const Controller = require('../core/Controller')

class CreateUserController extends Controller {
  constructor({ createUserUseCase }) {
    super()
    this.createUserUseCase = createUserUseCase
  }

  async handle(request) {
    const { name, gender, birthdate, cityId } = request.data

    const useCaseResponse = await this.createUserUseCase.execute({
      name,
      gender,
      birthdate,
      cityId,
    })

    const viewModel = {
      id: useCaseResponse.id,
    }

    return this.created(viewModel)
  }
}

module.exports = CreateUserController
