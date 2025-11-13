describe('App smoke', () => {
    it('opens home page', () => {
        cy.visit('/')
        cy.get('body').should('be.visible')
    })
})
