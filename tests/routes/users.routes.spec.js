const request = require('supertest')
const app = require('../../src/infra/http/app')
const SQLiteCitiesRepository = require('../../src/infra/repositories/SQLite/SQLiteCitiesRepository')
const SQLiteUsersRepository = require('../../src/infra/repositories/SQLite/SQLiteUsersRepository')
const {
  connect,
  disconnect,
  clearDataBase,
} = require('../../src/infra/sequelize/helper')
const City = require('../../src/domain/City')
const User = require('../../src/domain/User')

const sqliteCitiesRepository = new SQLiteCitiesRepository()
const sqliteUsersRepository = new SQLiteUsersRepository()
const city = new City({
  name: 'Rio do Sul',
  state: 'SC',
})
const user = new User({
  name: 'user name',
  gender: 'Masculino',
  birthdate: '2000-01-01',
  cityId: city.id,
})

describe('Users routes', () => {
  beforeAll(async () => {
    await connect()
  })

  beforeEach(async () => {
    await clearDataBase()

    await sqliteCitiesRepository.save(city)
  })

  afterAll(async () => {
    await clearDataBase()
    await disconnect()
  })

  test('Create user', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'user name',
        gender: 'Masculino',
        birthdate: '2000-01-01',
        cityId: city.id,
      })
      .expect(201)
  })

  test('Update the user name', async () => {
    await sqliteUsersRepository.save(user)

    await request(app)
      .patch(`/users/${user.id}/name`)
      .send({
        name: 'new user name',
      })
      .expect(204)
  })

  test('Delete user by id', async () => {
    await sqliteUsersRepository.save(user)

    await request(app).delete(`/users/${user.id}`).send().expect(204)
  })
})
