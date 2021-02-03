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
      cy.get('[data-testid=page-tree]').contains('Management').should('be.visible');

      cy.log('Create a new page');
      cy.get('[data-testid=button-step-5]').click();
      cy.get('[data-testid=add-new-page]').contains('Add').should('be.visible');
      cy.get('[data-testid="titles.en"]').type('from cypress');
      cy.get('[data-testid=page-code]').type(generateRandomId());
      cy.contains('.PageTreeSelector__page-name', 'Home').click();
      cy.get('[name=ownerGroup]').select('free');
      cy.get('[name=pageModel]').select('1-2-column');

      cy.log('Validate the creation');
      cy.get('[data-testid=save-page').contains('Save').click();
    });
  });
});

