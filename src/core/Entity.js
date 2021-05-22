const UniqueId = require('./UniqueId')

class Entity {
  constructor(props, uniqueId) {
    this.uniqueId = uniqueId || new UniqueId()
    this.props = props
  }

  get id() {
    return this.uniqueId.value
  }
}

module.exports = Entity
