const CitiesRepository = require('../../../repositories/CitiesRepository')

class FakeCitiesRepository extends CitiesRepository {
  constructor() {
    super()
    this.data = []
  }

  async findById(id) {
    return this.data.find((city) => city.id === id)
  }

  async findByName(name) {
    return this.data.filter(
      (city) => city.name.toLowerCase().indexOf(name.toLowerCase()) > -1,
    )
  }

  async findByState(state) {
    return this.data.filter(
      (city) => city.state.toLowerCase().indexOf(state.toLowerCase()) > -1,
    )
  }

  async save(city) {
    this.data.push(city)
  }
}

module.exports = FakeCitiesRepository
