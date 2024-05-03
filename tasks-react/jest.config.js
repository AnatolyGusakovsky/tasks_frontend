/** @type {import('jest').Config} */
module.exports = {
  // Uses the ts-jest preset to transform test files
  preset: 'ts-jest',

  clearMocks: true,

  // 'react-dnd' transformation slows down the first test per suite ran
  testTimeout: 10_000,

  transform: {
    '\\.css\\.ts$': '@vanilla-extract/jest-transform',
    '\\.css$': '@vanilla-extract/jest-transform',
    // see: https://github.com/react-dnd/react-dnd/issues/3443
    '\\/node_modules/(react-dnd|dnd-core|@react-dnd|react-dnd-html5-backend)/.+\\.(j|t)sx?$':
      'ts-jest',
  },

  // see https://github.com/react-dnd/react-dnd/issues/3443
  transformIgnorePatterns: [
    '\\node_modules/(?!react-dnd|core-dnd|@react-dnd|dnd-core|react-dnd-html5-backend)',
  ],

  // Allow these file extensions to be omitted in import statements
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],

  // The code Jest counts when measuring coverage
  collectCoverageFrom: ['<rootDir>/src/**/*.[jt]s?(x)'],

  // Specifies the maximum number of workers the worker-pool will spawn for running tests.
  // Available cores for CI are 4, with a total of 36. Defaults to cores available minus one.
  maxWorkers: process.env.CI ? 4 : 0,

  // The glob patterns Jest uses to detect test files
  // testMatch: ['<rootDir>/test/**/*.[jt]s?(x)', '<rootDir>/**/*.test.[jt]s?(x)'],
  testMatch: ['<rootDir>/**/*.test.[jt]s?(x)'],

  // Ignore cypress tests as they have their own runner
  testPathIgnorePatterns: ['<rootDir>/cypress'],

  // Initialization code to run before tests
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],

  // Run tests in JSDOM by default; use /** @jest-environment node */ docblock to override
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '\\.(png|gif|svg)$': '<rootDir>./assetMock.ts',
  },
};


// following was auto generated in package.json after ejecting:
// "jest": {
//   "roots": [
//     "<rootDir>/src"
//   ],
//     "collectCoverageFrom": [
//     "src/**/*.{js,jsx,ts,tsx}",
//     "!src/**/*.d.ts"
//   ],
//     "setupFiles": [
//     "react-app-polyfill/jsdom"
//   ],
//     "setupFilesAfterEnv": [
//     "<rootDir>/src/setupTests.ts"
//   ],
//     "testMatch": [
//     "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
//     "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
//   ],
//     "testEnvironment": "jsdom",
//     "transform": {
//     "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/config/jest/babelTransform.js",
//       "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
//       "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
//   },
//   "transformIgnorePatterns": [
//     "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
//     "^.+\\.module\\.(css|sass|scss)$"
//   ],
//     "modulePaths": [],
//     "moduleNameMapper": {
//     "^react-native$": "react-native-web",
//       "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
//   },
//   "moduleFileExtensions": [
//     "web.js",
//     "js",
//     "web.ts",
//     "ts",
//     "web.tsx",
//     "tsx",
//     "json",
//     "web.jsx",
//     "jsx",
//     "node"
//   ],
//     "watchPlugins": [
//     "jest-watch-typeahead/filename",
//     "jest-watch-typeahead/testname"
//   ],
//     "resetMocks": true
// },