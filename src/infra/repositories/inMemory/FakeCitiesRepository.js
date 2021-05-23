const CitiesRepository = require('../../../repositories/CitiesRepository')

class FakeCitiesRepository extends CitiesRepository {
  async findById(id) {}

  async findByName() {}

  async save(city) {}
}

module.exports = FakeCitiesRepository
