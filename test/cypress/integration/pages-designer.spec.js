describe('Pages Designer', () => {
  beforeEach(() => {
    cy.appBuilderLogin();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  describe('Drag and drop a widget', () => {
    it('Should add a widget to an empty frame in a page', () => {
      cy.openPageFromMenu(['Pages', 'Designer']);
      cy.getByTestId('config_ToolbarPageConfig_Tabs').contains('Page Tree').click();
      cy.getByTestId('common_PageTreeCompact_span').contains('My Homepage').click();
      cy.log('Select the widget');
      cy.getByTestId('config_ToolbarPageConfig_Tabs').contains('Widgets').click();
      // cy.getByTestId('config_WidgetGroupingItem_div').contains('News Latest')
      //  .drag('[data-testid=config_EmptyFrame_div]', { force: true });
      cy.dragAndDropWidgetToEmptyFrame('News Latest');
      cy.getPageStatus().should('contain', 'Published, with pending changes');
      // Use a regex to exactly match the "Publish" string
      cy.getByTestId('config_PageConfigPage_Button').contains(new RegExp('^Publish$')).click();
      cy.wait(1000);
      cy.getPageStatus().should('contain', 'Published');

      cy.deletePageWidget('News Latest');


      cy.wait(1000);
      // cy.
    });
  });
});

