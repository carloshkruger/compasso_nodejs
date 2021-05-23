const City = require('../../../src/domain/City')

class CityFactory {
  static create() {
    return new City(CityFactory.createCityDTO())
  }

  static createCityDTO() {
    return {
      name: 'Rio do Sul',
      state: 'SC',
    }
  }
}

module.exports = CityFactory
