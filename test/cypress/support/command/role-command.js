import { TEST_ID_ROLE_FORM, TEST_ID_ROLE_LIST_TABLE } from '../../../../src/ui/test-const/role-test-const';

Cypress.Commands.add('addRole', (roleName, roleCode, button) => {
  cy.log(`Add the new role  ${roleName}`);
  cy.openPageFromMenu(['Users', 'Roles']);
  cy.getButtonByText('Add').click();
  cy.getInputByName(TEST_ID_ROLE_FORM.NAME_FIELD).type(roleName);
  cy.getInputByName(TEST_ID_ROLE_FORM.CODE_FIELD).clear();
  cy.getInputByName(TEST_ID_ROLE_FORM.CODE_FIELD).type(roleCode);
  if (button) {
    cy.getByTestId(button).click();
  } else {
    cy.getByTestId(TEST_ID_ROLE_FORM.SAVE_BUTTON).click();
  }
});

Cypress.Commands.add('deleteRole', (roleCode) => {
  cy.log(`Delete role ${roleCode}`);
  cy.openPageFromMenu(['Users', 'Roles']);
  cy.openTableActionsByTestId(roleCode);
  cy.getVisibleActionItemByTestID(TEST_ID_ROLE_LIST_TABLE.ACTION_DELETE_ROLE).click();
  cy.getModalDialogByTitle('Delete role').should('be.visible');
  cy.getButtonByText('Delete').click();
});

Cypress.Commands.add('editRole', (roleCode, roleName) => {
  cy.log(`Edit role ${roleCode}`);
  cy.openPageFromMenu(['Users', 'Roles']);
  cy.openTableActionsByTestId(roleCode);
  cy.getVisibleActionItemByClass(TEST_ID_ROLE_LIST_TABLE.ACTION_EDIT_ROLE).click();
  cy.validateUrlChanged(`/role/edit/${roleCode}`);
  cy.getInputByName(TEST_ID_ROLE_FORM.NAME_FIELD).clear();
  cy.getInputByName(TEST_ID_ROLE_FORM.NAME_FIELD).type(roleName);
  cy.getByTestId(TEST_ID_ROLE_FORM.SAVE_BUTTON).click();
});

export {};
