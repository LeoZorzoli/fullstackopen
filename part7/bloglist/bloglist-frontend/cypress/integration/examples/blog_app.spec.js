describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ username: 'leonel', password: 'example', name: 'Leonel Zorzoli' })
    cy.createUser({ username: 'javier', password: 'example', name: 'Javier Zorzoli' })
    cy.login({ username: 'leonel', password: 'example' })
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Leonel Zorzoli')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Logout').click()
      cy.contains('Login').click()
        .get('#username').type('errorUsername')
        .get('#password').type('errorPassword')
        .get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Leonel Zorzoli logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.createBlog({
        author: 'Leonel',
        title: 'Last blog',
        url: 'example.com'
      })
    })

    it('like a blog', function() {
      cy.contains('View')
        .click()

      cy.contains('Like')
        .click()

      cy.contains('Likes: 1')
    })

    it('delete a blog with valid credentials', function() {
      cy.contains('View')
        .click()

      cy.contains('Remove')
        .click()

      cy.get('html').should('not.contain', 'Last blog')
    })

    it('delete a blog with invalid credentials', function() {
      cy.contains('Logout')
        .click()

      cy.login({ username: 'javier', password: 'example' })

      cy.contains('View')
        .click()

      cy.contains('Remove')
        .click()

      cy.get('html').should('contain', 'Last blog')
    })

    describe('blogs sorted', function() {
      beforeEach(function() {
        cy.createBlog({
          author: 'Leonel',
          title: 'First blog',
          url: 'example.com'
        })

        cy.createBlog({
          author: 'Leonel',
          title: 'Second blog',
          url: 'example.com'
        })
      })

      it.only('blogs are sorted by like', function() {
        cy.visit('http://localhost:3000')
        cy.contains('First blog')
          .contains('View')
          .click()

        cy.contains('Second blog')
          .contains('View')
          .click()

        cy.contains('Like')
          .click()

        cy.get('.title:first')
          .should('contain', 'First blog')
      })
    })
  })
})