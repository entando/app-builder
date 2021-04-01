import { TEST_ID_PAGE_DESIGNER, TEST_ID_WIDGET_FRAME } from '../../../../src/ui/test-const/page-designer-test-const';

Cypress.Commands.add('dragAndDropWidgetToFirstEmptyFrame', (widgetName) => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.WIDGET_LIST_ITEM).contains(widgetName)
    .drag(`[data-testid=${TEST_ID_WIDGET_FRAME.EMPTY_FRAME}]`, { position: 'center', force: true });
});

Cypress.Commands.add('addWidget', (widgetName, frameName) => {
  cy.log(`Add a new widget ${widgetName} to ${frameName}`);
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.WIDGET_LIST_ITEM).contains(widgetName)
    .drag(`[data-testid=WidgetFrame__${frameName.replace(/\s/g, '_')}]`, { position: 'center', force: true });
  cy.wait(500);
});

Cypress.Commands.add('moveWidget', (fromFrameName, toFrameName) => {
  cy.log(`Move the widget from frame ${fromFrameName} to ${toFrameName}`);
  cy.getByTestId(`WidgetFrame__${fromFrameName.replace(/\s/g, '_')}`)
    .drag(`[data-testid=WidgetFrame__${toFrameName.replace(/\s/g, '_')}]`, { position: 'center', force: true });
  cy.wait(500);
});

Cypress.Commands.add('getPageStatus', () => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.STATUS).invoke('attr', 'title');
});

Cypress.Commands.add('deletePageWidgetByFrame', (frameName) => {
  cy.getByTestId(`WidgetFrame__${frameName.replace(/\s/g, '_')}`).contains(frameName)
    .parent().find('button')
    .click();
  cy.getByTestId(TEST_ID_WIDGET_FRAME.ACTIONS).filter(':visible').contains('Delete').click();
});

Cypress.Commands.add('publishPageClick', () => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.BUTTON).contains(new RegExp('^Publish$')).click();
});

Cypress.Commands.add('applyDefaultWidgetsClick', () => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.BUTTON).contains(new RegExp('^Apply the default widget$')).click();
});

Cypress.Commands.add('unpublishPageClick', () => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.BUTTON).contains(new RegExp('^Unpublish$')).click();
});

Cypress.Commands.add('pageInfoClick', () => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.BUTTON).contains(new RegExp('^Info$')).click();
});

Cypress.Commands.add('restorePageClick', () => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.BUTTON).contains(new RegExp('^Restore$')).click();
});

export {};
