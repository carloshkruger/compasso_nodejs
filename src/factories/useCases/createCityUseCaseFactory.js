const SQLiteCitiesRepository = require('../../infra/repositories/SQLite/SQLiteCitiesRepository')
const CreateCityUseCase = require('../../useCases/CreateCityUseCase')

module.exports = () => {
  const citiesRepository = new SQLiteCitiesRepository()
  const createCityUseCase = new CreateCityUseCase({
    citiesRepository,
  })

  return createCityUseCase
}
