const UniqueId = require('../../../../src/core/UniqueId')
const City = require('../../../../src/domain/City')
const User = require('../../../../src/domain/User')
const SQLiteUsersRepository = require('../../../../src/infra/repositories/SQLite/SQLiteUsersRepository')
const SQLiteCitiesRepository = require('../../../../src/infra/repositories/SQLite/SQLiteCitiesRepository')
const {
  connect,
  disconnect,
  clearDataBase,
} = require('../../../../src/infra/sequelize/helper')

const sqliteCitiesRepository = new SQLiteCitiesRepository()
const sqliteUsersRepository = new SQLiteUsersRepository()

const cityDefault = new City({
  name: 'Aurora',
  state: 'SC',
})

const userDefault = new User({
  name: 'user name',
  gender: 'gender',
  birthdate: new Date(),
  cityId: cityDefault.id,
})

describe('SQLiteUsersRepository', () => {
  beforeEach(async () => {
    await connect()
    await clearDataBase()

    await sqliteCitiesRepository.save(cityDefault)
  })

  afterAll(async () => {
    await clearDataBase()
    await disconnect()
  })

  test('should create a new user', async () => {
    await expect(sqliteUsersRepository.save(userDefault)).resolves.not.toThrow()
  })

  test('should update an user', async () => {
    await sqliteUsersRepository.save(userDefault)

    const newUser = new User(
      {
        name: 'new user name',
        gender: 'gender',
        birthdate: new Date(),
        cityId: cityDefault.id,
      },
      new UniqueId(userDefault.id),
    )

    await expect(sqliteUsersRepository.save(newUser)).resolves.not.toThrow()
  })

  test('should delete an user by id', async () => {
    await sqliteUsersRepository.save(userDefault)

    await expect(
      sqliteUsersRepository.deleteById(userDefault.id),
    ).resolves.not.toThrow()
  })

  test('should find an user by id and return if exists', async () => {
    await sqliteUsersRepository.save(userDefault)

    const user = await sqliteUsersRepository.findById(userDefault.id)

    expect(user).toBeInstanceOf(User)
  })

  test('should find an user by id and return undefined if not exists', async () => {
    const user = await sqliteUsersRepository.findById(userDefault.id)

    expect(user).toBeFalsy()
  })
  // test('should update a city', async () => {
  //   await sqliteCitiesRepository.save(cityDefault)

  //   const city = new City(
  //     {
  //       name: 'Aurora new name',
  //       state: 'SC',
  //     },
  //     new UniqueId(cityDefault.id),
  //   )

  //   await expect(sqliteCitiesRepository.save(city)).resolves.not.toThrow()
  // })

  // test('should find a city by id and return if exists', async () => {
  //   await sqliteCitiesRepository.save(cityDefault)

  //   const city = await sqliteCitiesRepository.findById(cityDefault.id)

  //   expect(city).toBeInstanceOf(City)
  // })

  // test('should find a city by id and return undefined if not exists', async () => {
  //   const city = await sqliteCitiesRepository.findById(cityDefault.id)

  //   expect(city).toBeFalsy()
  // })

  // test('should find cities by name and return a list', async () => {
  //   await sqliteCitiesRepository.save(cityDefault)

  //   const cities = await sqliteCitiesRepository.findByName(cityDefault.name)

  //   expect(cities.length).toBe(1)
  // })

  // test('should find cities by name and return an empty list if none was found', async () => {
  //   const cities = await sqliteCitiesRepository.findByName('city name')

  //   expect(cities.length).toBe(0)
  // })

  // test('should find cities by state and return a list', async () => {
  //   await sqliteCitiesRepository.save(cityDefault)

  //   const cities = await sqliteCitiesRepository.findByState(cityDefault.state)

  //   expect(cities.length).toBe(1)
  // })

  // test('should find cities by state and return an empty list if none was found', async () => {
  //   const cities = await sqliteCitiesRepository.findByState('state name')

  //   expect(cities.length).toBe(0)
  // })
})
