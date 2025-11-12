describe('App smoke', () => {
    it('opens home page', () => {
        cy.visit('/') // работает благодаря baseUrl
        cy.contains('html') // простая проверка, чтобы увидеть PASS
    })
})
