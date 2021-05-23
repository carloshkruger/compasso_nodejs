const CitiesRepository = require('../../../repositories/CitiesRepository')

class FakeCitiesRepository extends CitiesRepository {
  async findById(id) {}

  async findByName() {}

  async findByState(state) {}

  async save(city) {}
}

module.exports = FakeCitiesRepository
