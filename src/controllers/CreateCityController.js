const Controller = require('../core/Controller')

class CreateCityController extends Controller {
  constructor({ createCityUseCase }) {
    super()
    this.createCityUseCase = createCityUseCase
  }

  async handle(request) {
    const { name, state } = request.data

    const useCaseResponse = await this.createCityUseCase.execute({
      name,
      state,
    })

    return this.created({
      id: useCaseResponse.id,
    })
  }
}

module.exports = CreateCityController
