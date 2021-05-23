const { Op } = require('sequelize')
const UniqueId = require('../../../core/UniqueId')
const City = require('../../../domain/City')
const CitiesRepository = require('../../../repositories/CitiesRepository')
const { CitySequelizeModel } = require('../../sequelize/models')

class SQLiteCitiesRepository extends CitiesRepository {
  mapModel(sequelizeModel) {
    return new City(
      {
        name: sequelizeModel.dataValues.name,
        state: sequelizeModel.dataValues.state,
      },
      new UniqueId(sequelizeModel.dataValues.id),
    )
  }

  async findById(id) {
    const cityModel = await CitySequelizeModel.findByPk(id)

    if (!cityModel) {
      return undefined
    }

    return this.mapModel(cityModel)
  }

  async findByName(name) {
    const cityModels = await CitySequelizeModel.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    })

    return cityModels.map((cityModel) => this.mapModel(cityModel))
  }

  async findByState(state) {
    const cityModels = await CitySequelizeModel.findAll({
      where: {
        state: {
          [Op.like]: `%${state}%`,
        },
      },
    })

    return cityModels.map((cityModel) => this.mapModel(cityModel))
  }

  async save(city) {
    const repositoryData = {
      id: city.id,
      name: city.name,
      state: city.state,
    }

    const exists = await CitySequelizeModel.findOne({
      where: {
        id: city.id,
      },
    })

    if (exists) {
      await CitySequelizeModel.update(repositoryData, {
        where: {
          id: repositoryData.id,
        },
      })
    } else {
      await CitySequelizeModel.create(repositoryData)
    }
  }
}

module.exports = SQLiteCitiesRepository
