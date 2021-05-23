const UsersRepository = require('../../../repositories/UsersRepository')
const { UserSequelizeModel } = require('../../sequelize/models')
const User = require('../../../domain/User')
const UniqueId = require('../../../core/UniqueId')

class SQLiteUsersRepository extends UsersRepository {
  mapModel(sequelizeModel) {
    return new User(
      {
        name: sequelizeModel.dataValues.name,
        gender: sequelizeModel.dataValues.gender,
        birthdate: sequelizeModel.dataValues.birthdate,
        cityId: sequelizeModel.dataValues.cityId,
      },
      new UniqueId(sequelizeModel.dataValues.id),
    )
  }

  async findById(id) {
    const userModel = await UserSequelizeModel.findByPk(id)

    if (!userModel) {
      return undefined
    }

    return this.mapModel(userModel)
  }

  async deleteById(id) {
    await UserSequelizeModel.destroy({
      where: {
        id,
      },
    })
  }

  async save(user) {
    const repositoryData = {
      id: user.id,
      name: user.name,
      gender: user.gender,
      birthdate: user.birthdate,
      cityId: user.cityId,
    }

    const exists = await UserSequelizeModel.findOne({
      where: {
        id: user.id,
      },
    })

    if (exists) {
      await UserSequelizeModel.update(repositoryData, {
        where: {
          id: repositoryData.id,
        },
      })
    } else {
      await UserSequelizeModel.create(repositoryData)
    }
  }
}

module.exports = SQLiteUsersRepository
