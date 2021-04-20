import { TEST_ID_GROUP_DELETE_ACTION } from '../../../../src/ui/test-const/group-test-const';

Cypress.Commands.add('addGroup', (groupName) => {
  cy.openPageFromMenu(['Users', 'Groups']);
  cy.getButtonByText('Add').click();
  cy.getByName('name').type(groupName);
  cy.getButtonByText('Save').click();
});

Cypress.Commands.add('deleteGroup', (groupCode) => {
  cy.openPageFromMenu(['Users', 'Groups']);
  cy.openTableActionsByTestId(groupCode);
  cy.getByTestId(TEST_ID_GROUP_DELETE_ACTION).filter(':visible').click();
  cy.wait(500);
  cy.getButtonByText('Delete').click();
});

Cypress.Commands.add('editGroup', (groupCode, newGroupName) => {
  cy.openPageFromMenu(['Users', 'Groups']);
  cy.openTableActionsByTestId(groupCode);
  cy.get(`[data-id=edit-${groupCode}`).find('a').click();
  cy.getByName('name').clear().type(newGroupName);
  cy.getButtonByText('Save').click();
});

export {};
