const UsersRepository = require('../../infra/repositories/SQLite/SQLiteUsersRepository')
const FindUserByIdUseCase = require('../../useCases/FindUserByIdUseCase')

module.exports = () => {
  const usersRepository = new UsersRepository()
  const findUserByIdUseCase = new FindUserByIdUseCase({
    usersRepository,
  })

  return findUserByIdUseCase
}
