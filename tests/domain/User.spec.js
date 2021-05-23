const AppError = require('../../src/core/AppError')
const FieldRequiredError = require('../../src/core/FieldRequiredError')
const UniqueId = require('../../src/core/UniqueId')
const User = require('../../src/domain/User')

let userDTO

describe('User', () => {
  beforeEach(() => {
    userDTO = {
      name: 'Valid user name',
      gender: 'Valid gender',
      birthdate: new Date().toISOString(),
      cityId: new UniqueId().value,
    }
  })

  test('should throw if name is not provided', () => {
    userDTO.name = ''

    expect(() => new User(userDTO)).toThrow(FieldRequiredError)
  })

  test('should throw if gender is not provided', () => {
    userDTO.gender = ''

    expect(() => new User(userDTO)).toThrow(FieldRequiredError)
  })

  test('should throw if birthdate is not provided', () => {
    userDTO.birthdate = ''

    expect(() => new User(userDTO)).toThrow(FieldRequiredError)
  })

  test('should throw if city is not provided', () => {
    userDTO.cityId = ''

    expect(() => new User(userDTO)).toThrow(FieldRequiredError)
  })

  test('should throw if the birthdate is not valid', () => {
    const invalidDate = '32/13/99999'

    userDTO.birthdate = invalidDate

    expect(() => new User(userDTO)).toThrow(AppError)
  })

  test('should throw if the birthdate is in the future', () => {
    const currentYear = new Date().getFullYear()

    const dateInTheFuture = new Date()
    dateInTheFuture.setFullYear(currentYear + 1)

    userDTO.birthdate = dateInTheFuture

    expect(() => new User(userDTO)).toThrow(AppError)
  })
})
