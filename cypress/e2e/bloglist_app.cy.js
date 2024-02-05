describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'testerX',
      password: 'pass',
      name: 'Testing man'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testerX')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()

      cy.contains('Testing man logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('abadf')
      cy.get('#password').type('pasDfsss')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain','Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('Testing man logged in').should('not.exist')
    })
  })

})