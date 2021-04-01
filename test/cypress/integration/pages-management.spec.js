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

    it('Should search the element by', () => {
      cy.searchBy('Page Name', 'toto');
      cy.clearResults();
    });

    it('Should open kebab and open the add page screen', () => {
      cy.openTableActionsByTestId('homepage').then(() => {
        cy.clickOnTableActionMenu('Add');
      });
    });
  });
});

