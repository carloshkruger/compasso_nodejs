const { v4 } = require('uuid')

class UniqueId {
  constructor(value) {
    this.value = value || v4()
  }
}

module.exports = UniqueId
