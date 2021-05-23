const request = require('supertest')
const app = require('../../src/infra/http/app')
const SQLiteCitiesRepository = require('../../src/infra/repositories/SQLite/SQLiteCitiesRepository')
const {
  connect,
  disconnect,
  clearDataBase,
} = require('../../src/infra/sequelize/helper')
const CityFactory = require('../factories/domain/CityFactory')

describe('Cities routes', () => {
  beforeAll(async () => {
    await connect()
  })

  beforeEach(async () => {
    await clearDataBase()
  })

  afterAll(async () => {
    await clearDataBase()
    await disconnect()
  })

  test('Create city', async () => {
    await request(app)
      .post('/cities')
      .send(CityFactory.createCityDTO())
      .expect(201)
  })

  test('Find cities by name', async () => {
    const sqliteCitiesRepository = new SQLiteCitiesRepository()

    const city = CityFactory.create()
    const cityName = city.name

    await sqliteCitiesRepository.save(city)

    await request(app).get(`/cities?name=${cityName}`).expect(200)
  })

  test('Find cities by uf', async () => {
    const sqliteCitiesRepository = new SQLiteCitiesRepository()

    const city = CityFactory.create()
    const cityUf = city.state

    await sqliteCitiesRepository.save(city)

    await request(app).get(`/uf/${cityUf}/cities`).expect(200)
  })
})
