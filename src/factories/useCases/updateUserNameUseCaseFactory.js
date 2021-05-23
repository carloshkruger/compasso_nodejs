const UsersRepository = require('../../infra/repositories/SQLite/SQLiteUsersRepository')
const UpdateUserNameUseCase = require('../../useCases/UpdateUserNameUseCase')

module.exports = () => {
  const usersRepository = new UsersRepository()
  const updateUserNameUseCase = new UpdateUserNameUseCase({
    usersRepository,
  })

  return updateUserNameUseCase
}
