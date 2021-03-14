module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest-setup.ts']
}
