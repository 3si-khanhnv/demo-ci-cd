// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config
module.exports = {
  preset: "jest-preset-angular",
  globalSetup: "jest-preset-angular/global-setup",
  roots: ["projects/glory-imo-dev/shared-components"],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@assets/(.*)": "<rootDir>/src/assets/$1",
    "@core/(.*)": "<rootDir>/src/app/core/$1",
    "@env": "<rootDir>/src/environments/environment",
    "@src/(.*)": "<rootDir>/src/src/$1",
    "@state/(.*)": "<rootDir>/src/app/state/$1",
    "^lodash-es$": "lodash",
    '.*worker.factory': '<rootDir>src/app/pages/inventory-history-page/worker.factory.constant.ts',
    'chart.js': '<rootDir>node_modules/chart.js/dist/chart.mjs',
  },
  transformIgnorePatterns: [  "/!node_modules\\/lodash-es/", "/node_modules/?!@angular"],
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  reporters: ["default"],
  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFiles: [
    "<rootDir>/jest-setup.ts",
  ],
  forceExit: true
};
