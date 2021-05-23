const UsersRepository = require('../../infra/repositories/SQLite/SQLiteUsersRepository')
const FindUsersByNameUseCase = require('../../useCases/FindUsersByNameUseCase')

module.exports = () => {
  const usersRepository = new UsersRepository()
  const findUsersByNameUseCase = new FindUsersByNameUseCase({
    usersRepository,
  })

  return findUsersByNameUseCase
}
