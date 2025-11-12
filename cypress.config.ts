import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000', // чтобы писать cy.visit('/') вместо полного URL
        specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}', // TS-спеки
        supportFile: 'cypress/support/e2e.ts',
    },
    video: true, // включай локально; в CI можно выключить
    retries: { runMode: 2, openMode: 0 }, // перезапуск в CI
    viewportWidth: 1280,
    viewportHeight: 800,
})
