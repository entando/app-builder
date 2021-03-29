describe('Pages Management', () => {
  beforeEach(() => {
    cy.appBuilderLogin();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  describe('Add a new one with all default values', () => {
    it('Should move a page in the page tree', () => {
      cy.openPageFromMenu(['Pages', 'Management']);
      cy.contains('Sitemap').parentsUntil('tr').get('.PageTree__drag-handle')
        .drag(cy.contains('My Homepage').parentsUntil('tr'));
      cy.wait(5000);
    });


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

