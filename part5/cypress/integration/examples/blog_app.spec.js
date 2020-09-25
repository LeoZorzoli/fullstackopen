describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('valid title ')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
    cy.get('#username').type('javier')
    cy.get('#password').type('example')
    cy.get('#login-button').click()

    cy.contains('javier zorzoli')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#username').type('javier')
      cy.get('#password').type('example')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('cypress title')
      cy.get('#author').type('leonel')
      cy.get('#url').type('cypress.com')
      cy.get('#blog-button').click()

      cy.contains('cypress title')
    })
  })
})