describe('Pages Management', () => {
  beforeEach(() => {
    cy.appBuilderLogin();
    cy.openPageFromMenu(['Pages', 'Management']);
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  describe('Move a page into the tree', () => {
    it('Should move the page in the right place according the place chosen in the tree', () => {
      cy.expand('Service');
      cy.dragAndDropPageAbove('Sitemap', 'Error page');
      cy.collapse('Service');

      cy.expand('Service');
      cy.dragAndDropPageBelow('Sitemap', 'My Homepage');
      cy.collapse('Service');
    });

    it('Should expand and collapse all', () => {
      cy.expandAll();
      cy.collapseAll();
    });
  });

  describe('Add a new one with all default values', () => {
    /*
    it('Should create a new page', () => {
      cy.openPageFromMenu(['Pages', 'Management']);
      cy.getByTestId('page-tree').contains('Management').should('be.visible');
      cy.log('Create a new page');
      cy.getByTestId('button-step-5').click();
      cy.getByTestId('add-new-page').contains('Add').should('be.visible');
      cy.getByTestId('titles.en').type('from cypress');
      cy.getByTestId('page-code').type(generateRandomId());
      cy.contains('.PageTreeSelector__page-name', 'Home').click();
      cy.getByName('ownerGroup').select('free');
      cy.getByName('pageModel').select('1-2-column');
      cy.log('Validate the creation');
      cy.getByTestId('save-page').contains('Save').click();
    });
    */
  });
});

