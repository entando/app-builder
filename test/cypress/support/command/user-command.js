import {
  TEST_ID_USER_FORM,
  TEST_ID_USER_LIST_TABLE,
  TEST_ID_USER_PROFILE_FORM,
  TEST_ID_USER_SEARCH_FORM,
} from '../../../../src/ui/test-const/user-test-const';

Cypress.Commands.add('addUser', (username, password, profileTypeCode, button) => {
  cy.log(`Add the new user  ${username}`);
  cy.openPageFromMenu(['Users', 'Management']);
  cy.getButtonByText('Add').click();
  cy.getByName(TEST_ID_USER_FORM.USERNAME_FIELD).type(username);
  cy.getByName(TEST_ID_USER_FORM.PASSWORD_FIELD).type(password);
  cy.getByName(TEST_ID_USER_FORM.CONFIRM_PASSWORD_FIELD).type(password);
  cy.getByName(TEST_ID_USER_FORM.PROFILE_TYPE_FIELD).select(profileTypeCode);
  if (button) {
    cy.getByTestId(button).click();
  } else {
    cy.getByTestId(TEST_ID_USER_FORM.SAVE_BUTTON).click();
  }
});

Cypress.Commands.add('searchUser', (username) => {
  cy.log(`Search User ${username}`);
  cy.openPageFromMenu(['Users', 'Management']);
  cy.getByTestId(TEST_ID_USER_SEARCH_FORM.USERNAME_FIELD).clear();
  cy.getByTestId(TEST_ID_USER_SEARCH_FORM.USERNAME_FIELD).type(username);
  cy.getByTestId(TEST_ID_USER_SEARCH_FORM.SEARCH_BUTTON).click();
});

Cypress.Commands.add('deleteUser', (username) => {
  cy.log(`Delete user ${username}`);
  cy.searchUser(username);
  cy.clickTableActions(username);
  cy.getVisibleActionItemByTestID(TEST_ID_USER_LIST_TABLE.ACTION_DELETE_USER).click();
  cy.getModalDialogByTitle('Delete user').should('be.visible');
  cy.getButtonByText('Delete').click();
});

Cypress.Commands.add('editUserProfile', (username, fullname, email) => {
  cy.searchUser(username);
  cy.clickTableActions(username);
  cy.getVisibleActionItemByClass(TEST_ID_USER_LIST_TABLE.ACTION_EDIT_PROFILE).click();
  cy.validateUrlChanged(`/userprofile/${username}`);
  cy.getByName(TEST_ID_USER_PROFILE_FORM.FULL_NAME_FIELD).type(fullname);
  cy.getByName(TEST_ID_USER_PROFILE_FORM.EMAIL_FIELD).type(email);
  cy.getByTestId(TEST_ID_USER_PROFILE_FORM.SAVE_BUTTON).click();
});


// Convert this to a module instead of script (allows import/export)
export {};
