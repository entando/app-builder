// returning false here prevents Cypress from failing the test
Cypress.on('uncaught:exception', () => false);
