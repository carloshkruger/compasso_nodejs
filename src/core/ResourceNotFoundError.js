const AppError = require('./AppError')

class ResourceNotFoundError extends AppError {
  constructor(resourceName) {
    super(`${resourceName} not found.`, 404)

    this.name = 'ResourceNotFoundError'
  }
}

module.exports = ResourceNotFoundError
