const UniqueId = require('../../../src/core/UniqueId')
const User = require('../../../src/domain/User')

class UserFactory {
  static create() {
    return new User(UserFactory.createUserDTO())
  }

  static createWithGivenCity(city) {
    const userDTO = {
      ...UserFactory.createUserDTO(),
      cityId: city.id,
    }

    return new User(userDTO)
  }

  static createUserDTO() {
    return {
      name: 'Valid user name',
      gender: 'valid gender',
      birthdate: new Date(),
      cityId: new UniqueId().value,
    }
  }
}

module.exports = UserFactory
