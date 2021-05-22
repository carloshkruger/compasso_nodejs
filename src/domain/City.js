const FieldRequiredError = require('../core/FieldRequiredError')
const Entity = require('../core/Entity')

class City extends Entity {
  constructor(props, id) {
    super(props, id)

    City.validate(props)
  }

  get name() {
    return this.props.name
  }

  get state() {
    return this.props.state
  }

  static validate(props) {
    if (!props.name) {
      throw new FieldRequiredError('Name')
    }

    if (!props.state) {
      throw new FieldRequiredError('State')
    }
  }
}

module.exports = City
