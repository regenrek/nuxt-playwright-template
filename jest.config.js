module.exports = {
  collectCoverage: true,
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'vue', 'ts'],
  verbose: true,
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^~~/(.*)$': '<rootDir>/$1',
    '^@/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    // '^.+\\.js$': [
    //   'babel-jest',
    //   {
    //     presets: [
    //       ['@babel/preset-env', { targets: { node: 'current' } }],
    //       '@babel/preset-typescript'
    //     ],
    //     plugins: ['@babel/plugin-transform-runtime']
    //   }
    // ],
    '.*\\.(vue)$': 'vue-jest'
  },
  collectCoverageFrom: ['test/**/*.ts'],
  preset: '@nuxt/test-utils',
  testTimeout: 25000
}