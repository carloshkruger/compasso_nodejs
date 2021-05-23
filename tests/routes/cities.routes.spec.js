const request = require('supertest')
const app = require('../../src/infra/http/app')
const SQLiteCitiesRepository = require('../../src/infra/repositories/SQLite/SQLiteCitiesRepository')
const {
  connect,
  disconnect,
  clearDataBase,
} = require('../../src/infra/sequelize/helper')
const City = require('../../src/domain/City')

describe('Cities routes', () => {
  beforeEach(async () => {
    await connect()
    await clearDataBase()
  })

  afterAll(async () => {
    await clearDataBase()
    await disconnect()
  })

  test('Create city', async () => {
    await request(app)
      .post('/cities')
      .send({
        name: 'new city name',
        state: 'SC',
      })
      .expect(201)
  })

  test('Find cities by name', async () => {
    const sqliteCitiesRepository = new SQLiteCitiesRepository()

    const cityName = 'Rio do Sul'

    await sqliteCitiesRepository.save(
      new City({
        name: cityName,
        state: 'SC',
      }),
    )

    await request(app).get(`/cities?name=${cityName}`).expect(200)
  })

  test('Find cities by uf', async () => {
    const sqliteCitiesRepository = new SQLiteCitiesRepository()

    const cityName = 'Rio do Sul'
    const cityUf = 'SC'

    await sqliteCitiesRepository.save(
      new City({
        name: cityName,
        state: cityUf,
      }),
    )

    await request(app).get(`/uf/${cityUf}/cities`).expect(200)
  })
})
