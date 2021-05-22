const FieldRequiredError = require('../../src/core/FieldRequiredError')
const City = require('../../src/domain/City')

describe('City entity', () => {
  test('should throw if name is not provided', () => {
    expect(() => new City({ name: '', state: 'SC' })).toThrow(
      FieldRequiredError,
    )
  })

  test('should throw if state is not provided', () => {
    expect(() => new City({ name: 'Aurora', state: '' })).toThrow(
      FieldRequiredError,
    )
  })

  test('should create a City instance if the correct values are provided', () => {
    const cityName = 'Aurora'
    const cityState = 'SC'
    const city = new City({ name: cityName, state: cityState })

    expect(city).toBeInstanceOf(City)
    expect(city.name).toBe(cityName)
    expect(city.state).toBe(cityState)
  })
})
