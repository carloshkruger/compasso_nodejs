const AppError = require('../core/AppError')
const Entity = require('../core/Entity')
const FieldRequiredError = require('../core/FieldRequiredError')
const { isDateInTheFuture, isValidDate } = require('../shared/utils/dateUtils')

class User extends Entity {
  constructor(props, id) {
    super(props, id)

    User.validate(props)
  }

  static validate(props) {
    User.validateName(props.name)

    if (!props.gender) {
      throw new FieldRequiredError('Gender')
    }

    if (!props.cityId) {
      throw new FieldRequiredError('City')
    }

    if (!props.birthdate) {
      throw new FieldRequiredError('Birthdate')
    }

    if (!isValidDate(props.birthdate)) {
      throw new AppError('Invalid birthdate.')
    }

    if (isDateInTheFuture(props.birthdate)) {
      throw new AppError('The birthdate can not be in the future.')
    }
  }

  static validateName(name) {
    if (!name) {
      throw new FieldRequiredError('Name')
    }
  }

  get name() {
    return this.props.name
  }

  get gender() {
    return this.props.gender
  }

  get birthdate() {
    return this.props.birthdate
  }

  get cityId() {
    return this.props.cityId
  }

  updateName(name) {
    User.validateName(name)

    this.props.name = name
  }
}

module.exports = User
