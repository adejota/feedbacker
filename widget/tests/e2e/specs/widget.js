// https://docs.cypress.io/api/introduction/api.html

const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Widget', () => {
  it('Check if widget button is showing', () => {
    cy.visit(APP_URL)
    cy.wait(2000)
    cy.get('#widget-open-button')
  })

  it('Check if box opens when widget button is clicked', () => {
    cy.visit(APP_URL)
    cy.wait(2000)
    cy.get('#widget-open-button').click()
    cy.get('#box')
  })

  it('Check if box label render correctly when box opens', () => {
    cy.visit(APP_URL)
    cy.wait(2000)
    cy.get('#widget-open-button').click()
    cy.get('#box-label').contains('O que você tem em mente?')
  })

  it('Check if wizard component render correctly', () => {
    cy.visit(APP_URL)
    cy.wait(2000)
    cy.get('#widget-open-button').click()
    cy.get('#wizard')
  })

  it('Check if box footer render correctly', () => {
    cy.visit(APP_URL)
    cy.wait(2000)
    cy.get('#widget-open-button').click()
    cy.get('#box-footer') 
  })
})
