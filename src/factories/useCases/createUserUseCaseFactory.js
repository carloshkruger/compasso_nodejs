const CitiesRepository = require('../../infra/repositories/SQLite/SQLiteCitiesRepository')
const UsersRepository = require('../../infra/repositories/SQLite/SQLiteUsersRepository')
const CreateUserUseCase = require('../../useCases/CreateUserUseCase')

module.exports = () => {
  const usersRepository = new UsersRepository()
  const citiesRepository = new CitiesRepository()

  const createUserUseCase = new CreateUserUseCase({
    usersRepository,
    citiesRepository,
  })

  return createUserUseCase
}
