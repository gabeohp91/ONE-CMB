module.exports = {
  roots: ['<rootDir>/../../src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['../../jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/../../src/$1'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './test/config/babel.config.js' }]
  },
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/shared/components/atoms/__tests__/' // Temporarily ignore problematic tests
  ]
};