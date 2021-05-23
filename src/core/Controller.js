const AppError = require('./AppError')

class Controller {
  async execute(params) {
    try {
      const response = await this.handle(params)

      return response
    } catch (error) {
      return this.handleExecutionError(error)
    }
  }

  async handle(request) {
    throw new Error('Method not implemented.')
  }

  ok(data) {
    return {
      statusCode: 200,
      data,
    }
  }

  created(data) {
    return {
      statusCode: 201,
      data,
    }
  }

  noContent() {
    return {
      statusCode: 204,
    }
  }

  handleExecutionError(error) {
    if (error instanceof AppError) {
      return {
        statusCode: 400,
        data: {
          error: error.message,
        },
      }
    }

    return {
      statusCode: 500,
      data: {
        error: 'Internal server error',
      },
    }
  }
}

module.exports = Controller
