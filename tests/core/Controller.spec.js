const AppError = require('../../src/core/AppError')
const Controller = require('../../src/core/Controller')

class TestController extends Controller {
  async handle() {}
}

let testController

describe('Controller', () => {
  beforeEach(() => {
    testController = new TestController()
  })

  test('should call handle method inside execute method', async () => {
    const handleSpy = jest.spyOn(testController, 'handle')

    const params = {
      data: {
        name: 'test name',
      },
    }

    await testController.execute(params)

    expect(handleSpy).toHaveBeenCalledWith(params)
  })

  test('should return only "Internal server error" if the error was originated by system', async () => {
    jest.spyOn(testController, 'handle').mockImplementation(async () => {
      throw new Error('Test error')
    })

    const params = {
      data: {
        name: 'test name',
      },
    }

    const response = await testController.execute(params)

    expect(response.message).toBe('Internal server error')
  })

  test('should return the error message if is an application error', async () => {
    const errorMessage = 'Application error'

    jest.spyOn(testController, 'handle').mockImplementation(async () => {
      throw new AppError(errorMessage)
    })

    const params = {
      data: {
        name: 'test name',
      },
    }

    const response = await testController.execute(params)

    expect(response.message).toBe(errorMessage)
  })

  test('should return statusCode 200 when "created" method is called', async () => {
    jest.spyOn(testController, 'handle').mockImplementation(async () => {
      return testController.created()
    })

    const params = {
      data: {
        name: 'test name',
      },
    }

    const response = await testController.execute(params)

    expect(response.statusCode).toBe(201)
  })

  test('should throw an error if handle method is called in a Controller base instance', async () => {
    const controller = new Controller()

    await expect(controller.handle({})).rejects.toThrow()
  })
})
