const UniqueId = require('../../../../src/core/UniqueId')
const User = require('../../../../src/domain/User')
const SQLiteUsersRepository = require('../../../../src/infra/repositories/SQLite/SQLiteUsersRepository')
const SQLiteCitiesRepository = require('../../../../src/infra/repositories/SQLite/SQLiteCitiesRepository')
const {
  connect,
  disconnect,
  clearDataBase,
} = require('../../../../src/infra/sequelize/helper')
const UserFactory = require('../../../factories/domain/UserFactory')
const CityFactory = require('../../../factories/domain/CityFactory')

const sqliteCitiesRepository = new SQLiteCitiesRepository()
const sqliteUsersRepository = new SQLiteUsersRepository()

const cityDefault = CityFactory.create()
const userDefault = UserFactory.createWithGivenCity(cityDefault)

describe('SQLiteUsersRepository', () => {
  beforeAll(async () => {
    await connect()
  })

  beforeEach(async () => {
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

  test('should find users by name and return a list', async () => {
    await sqliteUsersRepository.save(userDefault)

    const users = await sqliteUsersRepository.findByName(userDefault.name)

    expect(users.length).toBe(1)
  })

  test('should find users by name and return an empty list if none was found', async () => {
    const users = await sqliteCitiesRepository.findByName('user name')

    expect(users.length).toBe(0)
  })
})
