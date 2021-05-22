const AppError = require('./AppError')

class FieldRequiredError extends AppError {
  constructor(fieldName) {
    super(`${fieldName} is required.`)
    this.name = 'FieldRequiredError'
  }
}

module.exports = FieldRequiredError
