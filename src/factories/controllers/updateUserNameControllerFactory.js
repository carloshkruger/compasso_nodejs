const UpdateUserNameController = require('../../controllers/UpdateUserNameController')
const updateUserNameUseCaseFactory = require('../useCases/updateUserNameUseCaseFactory')

module.exports = () => {
  const updateUserNameController = new UpdateUserNameController({
    updateUserNameUseCase: updateUserNameUseCaseFactory(),
  })

  return updateUserNameController
}
