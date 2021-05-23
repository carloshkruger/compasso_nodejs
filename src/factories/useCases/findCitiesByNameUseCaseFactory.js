const SQLiteCitiesRepository = require('../../infra/repositories/SQLite/SQLiteCitiesRepository')
const FindCitiesByNameUseCase = require('../../useCases/FindCitiesByNameUseCase')

module.exports = () => {
  const citiesRepository = new SQLiteCitiesRepository()
  const findCitiesByNameUseCase = new FindCitiesByNameUseCase({
    citiesRepository,
  })

  return findCitiesByNameUseCase
}
