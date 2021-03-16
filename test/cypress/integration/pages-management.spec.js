import { generateRandomId } from '../support/utils';

describe('Pages', () => {
  beforeEach(() => {
    cy.appBuilderLogin();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });


  describe('Add a new one with all default values', () => {
    it('Should create a new page', () => {
      cy.openPageFromMenu(['Pages', 'Management'], true);

      cy.getByTestId('page-tree').contains('Management').should('be.visible');

      cy.log('Create a new page');
      cy.getByTestId('button-step-5').click();
      cy.getByTestId('add-new-page').contains('Add').should('be.visible');
      cy.getByTestId('titles.en').type('from cypress');
      cy.getByTestId('page-code').type(generateRandomId());
      cy.contains('.PageTreeSelector__page-name', 'Home').click();
      cy.getByName('[name=ownerGroup]').select('free');
      cy.get('[name=pageModel]').select('1-2-column');

      cy.log('Validate the creation');
      cy.getByTestId('save-page').contains('Save').click();
    });
  });
});

