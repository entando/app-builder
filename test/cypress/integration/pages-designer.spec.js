import { TEST_ID_PAGE_DESIGNER } from '../../../src/ui/test-const/page-designer-test-const';

describe('Pages Designer', () => {
  beforeEach(() => {
    cy.appBuilderLogin();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  describe('Drag and drop a widget', () => {
    it('Should add a widget to an empty frame in a page', () => {
      const WIDGET = 'News Latest';
      const FRAME = 'Frame 3';
      const PAGE = 'My Homepage';
      cy.openPageFromMenu(['Pages', 'Designer']);
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.CONFIG_TABS).contains('Page Tree').click();
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.PAGE_TREE).contains(PAGE).click();
      cy.log('Select the widget');
      cy.getByTestId(TEST_ID_PAGE_DESIGNER.CONFIG_TABS).contains('Widgets').click();
      cy.log('Add the widget to the page in the first empty frame');
      cy.dragAndDropWidgetToFrame(WIDGET, FRAME);
      cy.getPageStatus().should('contain', 'Published, with pending changes');
      cy.publishPageClick();
      cy.getPageStatus().should('contain', 'Published');
      cy.deletePageWidgetByFrame(FRAME);
      cy.publishPageClick();
    });
  });
});

