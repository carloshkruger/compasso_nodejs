const { isValidDate, isDateInTheFuture } = require("../../../src/shared/utils/dateUtils")

describe('dateUtils', () => {
  describe('isValidDate', () => {
    test('should return false if a date is invalid', () => {
      const invalidDate = new Date('32/13/999999')
      const isValid = isValidDate(invalidDate)

      expect(isValid).toBe(false)
    })

    test('should validate a string date', () => {
      const invalidDate = '32/13/999999'
      const isValid = isValidDate(invalidDate)

      expect(isValid).toBe(false)
    })

    test('should return true if a date is valid', () => {
      const validDate = new Date()
      const isValid = isValidDate(validDate)

      expect(isValid).toBe(true)
    })
  })

  describe('isDateInTheFuture', () => {
    test('should return true if a date is in the future', () => {
      const currentYear = new Date().getFullYear()
      const dateInTheFuture = new Date()
      dateInTheFuture.setFullYear(currentYear + 1)

      expect(isDateInTheFuture(dateInTheFuture)).toBe(true)
    })

    test('should return false if a date is not in the future', () => {
      const currentYear = new Date().getFullYear()
      const dateInThePast = new Date()
      dateInThePast.setFullYear(currentYear - 1)

      expect(isDateInTheFuture(dateInThePast)).toBe(false)
    })
  })
})