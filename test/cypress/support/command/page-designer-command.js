import { TEST_ID_PAGE_DESIGNER, TEST_ID_WIDGET_FRAME } from '../../../../src/ui/test-const/page-designer-test-const';

/**
 * Select a new widget from the widget list and add it to the first empty page frame
 * @param widgetName - the exact name displayed in the UI of the widget to drag&drop
 *        in the first empty frame of the page
 */
Cypress.Commands.add('dragAndDropWidgetToFirstEmptyFrame', (widgetName) => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.WIDGET_LIST_ITEM).contains(widgetName)
    .drag(`[data-testid=${TEST_ID_WIDGET_FRAME.EMPTY_FRAME}]`, { position: 'center', force: true });
});

/**
 * Select a new widget from the widget list and add it to a page frame
 * @param widgetName - the exact name displayed in the UI of the widget to add to the page
 * @param frameName - the exact name displayed in the UI of the frame where to drop the widget
 */
Cypress.Commands.add('addWidgetToFrame', (widgetName, frameName) => {
  cy.log(`Add a new widget ${widgetName} to ${frameName}`);
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.WIDGET_LIST_ITEM).contains(widgetName)
    .drag(`[data-testid=WidgetFrame__${frameName.replace(/\s/g, '_')}]`, { position: 'center', force: true });
  cy.wait(500);
});

/**
 * Move a widget from one frame to another
 * @param fromFrameName - the exact frame name displayed in the UI of the widget to move
 * @param toFrameName - the exact frame name displayed in the UI where to drop the widget
 */
Cypress.Commands.add('moveWidget', (fromFrameName, toFrameName) => {
  cy.log(`Move the widget from frame ${fromFrameName} to ${toFrameName}`);
  cy.getByTestId(`WidgetFrame__${fromFrameName.replace(/\s/g, '_')}`)
    .drag(`[data-testid=WidgetFrame__${toFrameName.replace(/\s/g, '_')}]`, { position: 'center', force: true });
  cy.wait(500);
});

/**
 Get the page status string
 */
Cypress.Commands.add('getPageStatus', () => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.STATUS).invoke('attr', 'title');
});

/**
  Delete the widget contained in the selected frame
  @param frameName - the exact frame name displayed in the UI e.g. "Frame 1", "Logo"
 */
Cypress.Commands.add('deletePageWidgetByFrame', (frameName) => {
  cy.getByTestId(`WidgetFrame__${frameName.replace(/\s/g, '_')}`).contains(frameName)
    .parent().find('button')
    .click();
  cy.getByTestId(TEST_ID_WIDGET_FRAME.ACTIONS).filter(':visible').contains('Delete').click();
});

/**
  Open the details of the widget contained in the selected frame
  @param frameName - the exact frame name displayed in the UI e.g. "Frame 1", "Logo"
 */
Cypress.Commands.add('openPageWidgetDetailsByFrame', (frameName) => {
  cy.getByTestId(`WidgetFrame__${frameName.replace(/\s/g, '_')}`).contains(frameName)
    .parent().find('button')
    .click();
  cy.getByTestId(TEST_ID_WIDGET_FRAME.ACTION_LINKS).filter(':visible').contains('Details').click();
});

/**
  Open widget form for saving as new widget
  @param frameName - the exact frame name displayed in the UI e.g. "Frame 1", "Logo"
 */
Cypress.Commands.add('openSaveAsWidgetWithFrame', (frameName) => {
  cy.getByTestId(`WidgetFrame__${frameName.replace(/\s/g, '_')}`).contains(frameName)
    .parent().find('button')
    .click();
  cy.getByTestId(TEST_ID_WIDGET_FRAME.ACTIONS).filter(':visible').contains('Save As').click();
});

/**
  Click on Publish Button in page designer
*/
Cypress.Commands.add('publishPageClick', () => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.BUTTON).contains(new RegExp('^Publish$')).click();
});

/**
 Click on Apply Default Widgets Button in page designer
 */
Cypress.Commands.add('applyDefaultWidgetsClick', () => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.BUTTON).contains(new RegExp('^Apply the default widget$')).click();
});

/**
 Click on Unpublish Button in page designer
 */
Cypress.Commands.add('unpublishPageClick', () => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.BUTTON).contains(new RegExp('^Unpublish$')).click();
});

/**
 Click on Info Button in page designer
 */
Cypress.Commands.add('pageInfoClick', () => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.BUTTON).contains(new RegExp('^Info$')).click();
});

/**
 Click on Restore Button in page designer
 */
Cypress.Commands.add('restorePageClick', () => {
  cy.getByTestId(TEST_ID_PAGE_DESIGNER.BUTTON).contains(new RegExp('^Restore$')).click();
});

export {};
