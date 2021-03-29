Cypress.Commands.add('dragAndDropWidgetToEmptyFrame', (widgetName) => {
  cy.getByTestId('config_WidgetGroupingItem_div').contains(widgetName)
    .drag('[data-testid=config_EmptyFrame_div]', { force: true });
});

Cypress.Commands.add('getPageStatus', () => {
  cy.getByTestId('common_PageStatusIcon_i').invoke('attr', 'title');
});

Cypress.Commands.add('deletePageWidget', (widgetName) => {
  cy.getByTestId('config_WidgetFrame_div').contains(widgetName).find('button.dropdown-toggle').click();
  cy.getByTestId('config_WidgetFrame_MenuItem').filter(':visible').contains('Delete').click();
});
