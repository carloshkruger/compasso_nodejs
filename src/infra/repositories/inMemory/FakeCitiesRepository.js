const CitiesRepository = require('../../../repositories/CitiesRepository')

class FakeCitiesRepository extends CitiesRepository {
  async findByName() {}

  async save(city) {}
}

module.exports = FakeCitiesRepository
