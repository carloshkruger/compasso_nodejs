const { isValid, parseISO } = require('date-fns')

const parseStringDateToObject = (date) => parseISO(date)

const isValidDate = (date) => {
  if (date instanceof Date) {
    return isValid(date)
  }

  return isValid(parseStringDateToObject(date))
}

const isDateInTheFuture = (date) => {
  const currentDate = new Date()
  return currentDate - date < 0
}

module.exports = {
  isValidDate,
  isDateInTheFuture,
}
