const SQLiteCitiesRepository = require('../../infra/repositories/SQLite/SQLiteCitiesRepository')
const FindCitiesByStateUseCase = require('../../useCases/FindCitiesByStateUseCase')

module.exports = () => {
  const citiesRepository = new SQLiteCitiesRepository()
  const findCitiesByStateUseCase = new FindCitiesByStateUseCase({
    citiesRepository,
  })

  return findCitiesByStateUseCase
}
