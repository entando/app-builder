// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

Cypress.Commands.add('accessToManagementPage', () => {
  cy.log('Access to management page');
  cy.visit('/');
  cy.contains('Pages').click();
  cy.contains('Management').click();
});

// Convert this to a module instead of script (allows import/export)
export {};
