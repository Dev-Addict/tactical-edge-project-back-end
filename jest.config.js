/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	rootDir: './src/tests',
	setupFiles: ['<rootDir>/env.setup.ts'],
};
