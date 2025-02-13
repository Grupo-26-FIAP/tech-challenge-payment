import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@Domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@Infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@Application/(.*)$': '<rootDir>/src/application/$1',
  },
  collectCoverageFrom: [
    './src/**/*.(t|j)s',
    '!./src/**/*.spec.(t|j)s',
    '!./src/**/main.ts',
    '!./src/**/*entity*.(t|j)s',
    '!./src/**/*dto*.(t|j)s',
    '!./src/**/*module*.(t|j)s',
    '!./src/**/*model*.(t|j)s',
    '!./src/**/*mock*.(t|j)s',
    '!./src/**/*config*.(t|j)s',
    '!./src/**/*enum*.(t|j)s',
    '!./src/**/*interface*.(t|j)s',
    '!./src/**/*dto*.(t|j)s',
    '!./src/**/*constant*.(t|j)s',
    '!./src/**/*mapper*.(t|j)s',
  ],
  coveragePathIgnorePatterns: ['/src/shared/'],
  coverageReporters: ['html', 'text'],
};

export default config;
