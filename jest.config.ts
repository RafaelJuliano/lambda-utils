import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '__tests__',
    'testUtils.ts',
    'index.ts',
    '/exceptions/',
    '/domain/',
  ],
  moduleDirectories: ['node_modules'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
}

export default config
