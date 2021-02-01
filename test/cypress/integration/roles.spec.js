function generateRandomId() {
  return Math.floor(Math.random() * Math.floor(999999999999999));
}

describe('Users', () => {
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
      cy.get('[data-cy=user-roles]').contains('Roles').should('be.visible');

      cy.get('[data-cy=add-new-role]').click(); // This is a good selector
      cy.get('[data-cy=add-user-role]').contains('Add').should('be.visible');
      cy.get('[data-cy=add-role-name-input').type('irakli');

      cy.get('[data-cy=save-role').contains('Save').click();
      cy.get('[data-cy=user-roles]').contains('Roles').should('be.visible');
    });
  });


  describe('Edit an existing role', () => {
    it('Should edit an existing role', () => {
      cy.visit('/');
      cy.contains('Users').click();
      cy.contains('Roles').click();
      cy.get('[data-cy=user-roles]').contains('Roles').should('be.visible');

      cy.get('.RoleListRow__td.text-center').first().click();
      cy.get('.RoleListMenuAction__menu-item-edit').first().click();
      cy.get('[data-cy=edit-user-role]').contains('Edit').should('be.visible');
      cy.get('[data-cy=add-role-name-input').type('irakli');

      cy.get('[data-cy=save-role').contains('Save').click();
      cy.get('[data-cy=user-roles]').contains('Roles').should('be.visible');
    });
  });
});

