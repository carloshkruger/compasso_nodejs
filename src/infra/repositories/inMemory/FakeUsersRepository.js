const UsersRepository = require('../../../repositories/UsersRepository')

class FakeUsersRepository extends UsersRepository {
  async findById() {}

  async findByName() {}

  async deleteById() {}

  async save(user) {}
}

module.exports = FakeUsersRepository
