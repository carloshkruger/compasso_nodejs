const expressRouterAdapter = (controller) => async (request, response) => {
  const data = {
    ...(request.body || {}),
    ...(request.params || {}),
    ...(request.query || {}),
  }

  const controllerResponse = await controller.execute({
    data,
  })

  return response
    .status(controllerResponse.statusCode)
    .json(controllerResponse.data)
}

module.exports = expressRouterAdapter
