const FieldRequiredError = require('../../src/core/FieldRequiredError')

describe('FieldRequiredError', () => {
  test('should concatenate the field name with "is required." to create the error message', () => {
    const fieldName = 'Name'
    const expectedErrorMessage = `${fieldName} is required.`
    const error = new FieldRequiredError(fieldName)

    expect(error.message).toBe(expectedErrorMessage)
  })
})
