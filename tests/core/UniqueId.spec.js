const UniqueId = require('../../src/core/UniqueId')

describe('UniqueId', () => {
  test('Should generate a new id if no one is provided', () => {
    const id = new UniqueId()
    expect(id.value).toBeTruthy()
  })

  test('should not generate a new id if a value is provided', () => {
    const id = new UniqueId('new-id')
    expect(id.value).toBe('new-id')
  })
})
