import { generateRandomId } from '../support/utils';

describe('Roles', () => {
  const roleCode = generateRandomId();

  beforeEach(() => {
    cy.appBuilderLogin();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  describe('Add a new role', () => {
    it('Should create a new role', () => {
      cy.openPageFromMenu(['Users', 'Roles']);
      cy.getByTestId('user-roles').contains('Roles').should('be.visible');
      cy.getByTestId('add-new-role').click();
      cy.getByTestId('add-user-role').contains('Add').should('be.visible');
      cy.getByName('name').type(roleCode);
      cy.getByTestId('save-role').contains('Save').click();
      cy.getByTestId('user-roles').contains('Roles').should('be.visible');
    });
  });

  describe('Edit an existing role', () => {
    it('Should edit an existing role', () => {
      cy.visit(`/role/edit/${roleCode}`);
      cy.getByTestId('edit-user-role').contains('Edit').should('be.visible');
      cy.getByName('name').type('Cypress role edited');
      cy.getByTestId('save-role').contains('Save').click();
      cy.getByTestId('user-roles').contains('Roles').should('be.visible');
    });
  });
});

