enterConfirmCheckNegative: (selector,value1,value2,stateButton ) => {
  cy.get(`[data-testid="input-enter-${selector}"]`)
    .type(value1)
  cy.get(`[data-testid="input-confirm-${selector}"]`)
    .type(value2)
  cy.get(`[data-testid="recordButton-${selector}"]`)
    .click()
  cy.get('[data-testid="primary-button-action"]').should(stateButton)
  cy.reload()
},
