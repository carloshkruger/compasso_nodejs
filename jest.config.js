module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/src/repositories/**',
    '!**/src/infra/repositories/inMemory/**',
    '!**/src/infra/http/server.js',
    '!**/src/infra/http/adapters/**',
    '!**/src/infra/sequelize/utils/**',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}
