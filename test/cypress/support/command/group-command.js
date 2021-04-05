Cypress.Commands.add('addGroup', (groupName) => {
  cy.openPageFromMenu(['Users', 'Groups']);
  cy.getButtonByText('Add').click();
  cy.getByName('name').type(groupName);
  cy.getButtonByText('Save').click();
});

Cypress.Commands.add('deleteGroup', (groupCode) => {
  cy.openPageFromMenu(['Users', 'Groups']);
  cy.clickTableActions(groupCode);
  cy.getByTestId('group-delete-action').filter(':visible').click();
  cy.getButtonByText('Delete').click();
});

Cypress.Commands.add('editGroup', (groupCode, newGroupName) => {
  cy.openPageFromMenu(['Users', 'Groups']);
  cy.clickTableActions(groupCode);
  cy.get(`[data-id=edit-${groupCode}`).find('a').click();
  cy.getByName('name').clear().type(newGroupName);
  cy.getButtonByText('Save').click();
});

export {};
