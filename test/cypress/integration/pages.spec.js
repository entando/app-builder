function generateRandomId() {
  return Math.floor(Math.random() * Math.floor(999999999999999));
}

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

  /*
   * TODO Change all selectors to use data-cy instead
   */
  describe('Add a new one with all default values', () => {
    it('Should create a new page', () => {
      cy.accessToManagementPage();
      cy.get('.PageTitle__title').contains('Management').should('be.visible');

      cy.log('Create a new page');
      cy.get('[data-cy=button-step-5]').click(); // This is a good selector
      cy.get('.PageTitle__title').contains('Add').should('be.visible'); // This is a bad one
      cy.get('input[id="titles.en"]').type('from cypress');
      cy.get('input[id="code"]').type(generateRandomId());
      cy.contains('.PageTreeSelector__page-name', 'Home').click();
      cy.get('[name=ownerGroup]').select('free');
      cy.get('[name=pageModel]').select('1-2-column');

      cy.log('Validate the creation');
      cy.get('.app-tour-step-11').contains('Save and Design').click();
    });
  });
});

