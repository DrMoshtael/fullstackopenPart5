describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'testerX',
      password: 'pass',
      name: 'Testing man'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testerX')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()

      cy.contains('Testing man logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('abadf')
      cy.get('#password').type('pasDfsss')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('Testing man logged in').should('not.exist')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login('testerX','pass')
    })

    it('a blog can be created', function() {
      cy.contains('add new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://www.testX.com')
      cy.get('#blogForm-button').click()

      cy.contains('Test title')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.addBlog('Test title', 'Test Author', 'http://www.testX.com')
      })

      it('it can be liked', function() {
        cy.contains('Test title').contains('view').click()
        cy.contains('like').click()
        cy.contains('1')
      })

      it('it can be deleted by the creator', function() {
        cy.contains('Test title').contains('view').click()
        cy.contains('remove').click()
        // cy.contains('OK').click()
        cy.contains('Test title').should('not.exist')
      })
    })

  })
})