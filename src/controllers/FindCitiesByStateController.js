const Controller = require('../core/Controller')

class FindCitiesByStateController extends Controller {
  constructor({ findCitiesByStateUseCase }) {
    super()
    this.findCitiesByStateUseCase = findCitiesByStateUseCase
  }

  async handle(request) {
    const { state } = request.data

    const cities = await this.findCitiesByStateUseCase.execute({ state })

    const viewModels = cities.map((city) => ({
      name: city.name,
      state: city.state,
    }))

    return this.ok(viewModels)
  }
}

module.exports = FindCitiesByStateController
