/// <reference types="Cypress" />

describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Clare',
      username: 'Clare',
      password: 'Clare'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
    cy.get('#logout')
      .click()
  })

  it('front page can be opened', function() {
    cy.contains('FullStackOpen')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username')
        .type('Clare')
      cy.get('#password')
        .type('Clare')
      cy.get('#login')
        .click()
    })

    it('name of the user is shown', function() {
      cy.contains('Logged in as Clare')
    })

    it('a new blog can be created', function() {
      cy.contains('New Blog')
        .click()
      cy.get('#title')
        .type('cypress test title')
      cy.get('#author')
        .type('cypress test author')
      cy.get('#url')
        .type('www.example.com/cypress')
      cy.get('#create')
        .click()
    })
  })
})
