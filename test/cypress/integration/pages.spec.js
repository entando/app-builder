import { generateRandomId } from '../support/utils';

describe('Pages', () => {
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


  describe('Add a new one with all default values', () => {
    it('Should create a new page', () => {
      cy.accessToManagementPage();
      cy.get('[data-cy=page-tree]').contains('Management').should('be.visible');

      cy.log('Create a new page');
      cy.get('[data-cy=button-step-5]').click();
      cy.get('[data-cy=add-new-page]').contains('Add').should('be.visible');
      cy.get('[data-cy="titles.en"]').type('from cypress');
      cy.get('[data-cy=page-code]').type(generateRandomId());
      cy.contains('.PageTreeSelector__page-name', 'Home').click();
      cy.get('[name=ownerGroup]').select('free');
      cy.get('[name=pageModel]').select('1-2-column');

      cy.log('Validate the creation');
      cy.get('[data-cy=save-page').contains('Save').click();
    });
  });
});

