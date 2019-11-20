module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  rootDir: 'src/__visual_tests__',
  moduleNameMapper: {
    '^~/(.+)': '<rootDir>/../$1',
  },
};
