const AppError = require('../../src/core/AppError')

describe('AppError', () => {
  test('should throw the message provided', () => {
    const errorMessage = 'error message'
    const error = new AppError(errorMessage)

    expect(error.message).toBe(errorMessage)
  })
})
