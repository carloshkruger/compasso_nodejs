const UsersRepository = require('../../infra/repositories/SQLite/SQLiteUsersRepository')
const DeleteUserByIdUseCase = require('../../useCases/DeleteUserByIdUseCase')

module.exports = () => {
  const usersRepository = new UsersRepository()
  const deleteUserByIdUseCase = new DeleteUserByIdUseCase({
    usersRepository,
  })

  return deleteUserByIdUseCase
}
