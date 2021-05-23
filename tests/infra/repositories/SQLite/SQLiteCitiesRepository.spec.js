const UniqueId = require('../../../../src/core/UniqueId')
const City = require('../../../../src/domain/City')
const SQLiteCitiesRepository = require('../../../../src/infra/repositories/SQLite/SQLiteCitiesRepository')
const {
  connect,
  disconnect,
  clearDataBase,
} = require('../../../../src/infra/sequelize/helper')
const CityFactory = require('../../../factories/domain/CityFactory')

const sqliteCitiesRepository = new SQLiteCitiesRepository()

const cityDefault = CityFactory.create()

describe('SQLiteCitiesRepository', () => {
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

  test('should create a new city', async () => {
    await expect(
      sqliteCitiesRepository.save(cityDefault),
    ).resolves.not.toThrow()
  })

  test('should update a city', async () => {
    await sqliteCitiesRepository.save(cityDefault)

    const city = new City(
      {
        name: 'Aurora new name',
        state: 'SC',
      },
      new UniqueId(cityDefault.id),
    )

    await expect(sqliteCitiesRepository.save(city)).resolves.not.toThrow()
  })

  test('should find a city by id and return if exists', async () => {
    await sqliteCitiesRepository.save(cityDefault)

    const city = await sqliteCitiesRepository.findById(cityDefault.id)

    expect(city).toBeInstanceOf(City)
  })

  test('should find a city by id and return undefined if not exists', async () => {
    const city = await sqliteCitiesRepository.findById(cityDefault.id)

    expect(city).toBeFalsy()
  })

  test('should find cities by name and return a list', async () => {
    await sqliteCitiesRepository.save(cityDefault)

    const cities = await sqliteCitiesRepository.findByName(cityDefault.name)

    expect(cities.length).toBe(1)
  })

  test('should find cities by name and return an empty list if none was found', async () => {
    const cities = await sqliteCitiesRepository.findByName('city name')

    expect(cities.length).toBe(0)
  })

  test('should find cities by state and return a list', async () => {
    await sqliteCitiesRepository.save(cityDefault)

    const cities = await sqliteCitiesRepository.findByState(cityDefault.state)

    expect(cities.length).toBe(1)
  })

  test('should find cities by state and return an empty list if none was found', async () => {
    const cities = await sqliteCitiesRepository.findByState('state name')

    expect(cities.length).toBe(0)
  })
})
