const Controller = require('../core/Controller')

class FindCitiesByNameController extends Controller {
  constructor({ findCitiesByNameUseCase }) {
    super()
    this.findCitiesByNameUseCase = findCitiesByNameUseCase
  }

  async handle(request) {
    const { name } = request.data

    const cities = await this.findCitiesByNameUseCase.execute({ name })

    const viewModels = cities.map((city) => ({
      name: city.name,
      state: city.state,
    }))

    return this.ok(viewModels)
  }
}

module.exports = FindCitiesByNameController
