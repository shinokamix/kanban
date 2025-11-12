import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
})

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/app/$1',
        '^@shared/(.*)$': '<rootDir>/shared/$1',
        '^@entities/(.*)$': '<rootDir>/entities/$1',
        '^@features/(.*)$': '<rootDir>/features/$1',
        '^@widgets/(.*)$': '<rootDir>/widgets/$1',
        '^@processes/(.*)$': '<rootDir>/processes/$1',
    },
}

export default createJestConfig(config)
