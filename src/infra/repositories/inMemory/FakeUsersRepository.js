const UsersRepository = require('../../../repositories/UsersRepository')

class FakeUsersRepository extends UsersRepository {
  async findById() {}

  async save(user) {}
}

module.exports = FakeUsersRepository
