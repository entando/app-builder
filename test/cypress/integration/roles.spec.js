import { generateRandomId } from '../support/utils';

describe('Roles', () => {
  const roleCode = generateRandomId();
  beforeEach(() => {
    cy.getOauth2Data();
    cy.get('@oauth2Data').then((oauth2Data) => {
      cy.keycloackLogin(oauth2Data, 'user');
    });
  });

  afterEach(() => {
    cy.get('@oauth2Data').then((oauth2Data) => {
      cy.keycloackLogout(oauth2Data);
    });
    cy.clearCache();
  });

  describe('Add a new role', () => {
    it('Should create a new role', () => {
      cy.visit('/');
      cy.contains('Users').click();
      cy.contains('Roles').click();
      cy.get('[data-testid=user-roles]').contains('Roles').should('be.visible');

      cy.get('[data-testid=add-new-role]').click();
      cy.get('[data-testid=add-user-role]').contains('Add').should('be.visible');
      cy.get('[data-testid=add-role-name-input').type(roleCode);

      cy.get('[data-testid=save-role').contains('Save').click();
      cy.get('[data-testid=user-roles]').contains('Roles').should('be.visible');
    });
  });


  describe('Edit an existing role', () => {
    it('Should edit an existing role', () => {
      cy.visit(`/role/edit/${roleCode}`);
      cy.get('[data-testid=edit-user-role]').contains('Edit').should('be.visible');
      cy.get('[data-testid=add-role-name-input').type('Cypress role edited');

      cy.get('[data-testid=save-role').contains('Save').click();
      cy.get('[data-testid=user-roles]').contains('Roles').should('be.visible');
    });
  });
});

