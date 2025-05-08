 
import { readFileSync } from 'fs';

// Reading the SWC compilation config for the spec files
const swcJestConfig = JSON.parse(
  readFileSync(`${__dirname}/.spec.swcrc`, 'utf-8')
);

// Disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves
swcJestConfig.swcrc = false;

export default {
  displayName: '@test-smart-url-shortener/server',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!elysia|@elysiajs|nanostores)', // Transform ESM dependencies
  ],
  moduleFileExtensions: ['ts', 'js', 'html'],
  extensionsToTreatAsEsm: ['.ts'], // Treat `.ts` files as ES Modules
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  moduleNameMapper: {
    '^@shortlink/shared$': '<rootDir>/../../../libs/shared/src/index.ts',
    '^@shortlink/shared/(.*)$': '<rootDir>/../../../libs/shared/src/$1',
  },
  coverageDirectory: 'test-output/jest/coverage',
};
