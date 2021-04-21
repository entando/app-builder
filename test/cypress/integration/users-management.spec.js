import { generateRandomId } from '../support/utils';

import {
  TEST_ID_USER_AUTHORITY_MODAL,
  TEST_ID_USER_AUTHORITY_TABLE,
  TEST_ID_USER_FORM,
  TEST_ID_DETAIL_USER_TABLE,
  TEST_ID_USER_PROFILE_FORM,
  TEST_ID_USER_LIST_TABLE,
} from '../../../src/ui/test-const/user-test-const';
import TEST_ID_GENERIC_MODAL from '../../../src/ui/test-const/test-const';

describe('Users Management', () => {
  const PROFILE_TYPE_CODE = 'PFL';
  const FULL_NAME = 'Test Test';
  const EMAIL = 'email-user-test@entando.com';

  const group = {
    ID: 'free',
    DESCRIPTION: 'Free Access',
  };

  const role = {
    ID: 'admin',
    DESCRIPTION: 'Administrator',
  };

  beforeEach(() => {
    cy.appBuilderLogin();
    cy.closeWizardAppTour();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  describe('User ', () => {
    it('Should add and delete a new user', () => {
      cy.log('Validate user creation');
      const username = generateRandomId();
      const password = generateRandomId();
      cy.addUser(username, password, PROFILE_TYPE_CODE);
      cy.searchUser(username);
      cy.getTableRowsBySelector(username).should('be.visible');
      cy.getTableRowsByTestId(TEST_ID_USER_LIST_TABLE.TABLE).should('have.length', 1);
      cy.deleteUser(username);
      cy.log('Validate user deletion');
      cy.openPageFromMenu(['Users', 'Management']);
      cy.searchUser(username);
      cy.contains(username).should('not.exist');
      cy.getByTestId(TEST_ID_USER_LIST_TABLE.ALERT).contains('There are no USERS available').should('be.visible');
    });

    it('Should update a user', () => {
      cy.log('Update the user');
      const username = generateRandomId();
      const password = generateRandomId();
      cy.addUser(username, password, PROFILE_TYPE_CODE);
      const newPassword = 'new_password_tests';
      cy.searchUser(username);
      cy.getTableRowsBySelector(username).contains('Not active').should('be.visible');
      cy.openTableActionsByTestId(username);
      cy.getVisibleActionItemByClass(TEST_ID_USER_LIST_TABLE.ACTION_EDIT_USER).click();
      cy.getInputByName(TEST_ID_USER_FORM.USERNAME_FIELD).should('have.value', username);
      cy.getInputByName(TEST_ID_USER_FORM.PASSWORD_FIELD).type(newPassword);
      cy.getInputByName(TEST_ID_USER_FORM.CONFIRM_PASSWORD_FIELD).type(newPassword);
      cy.getByTestId(TEST_ID_USER_FORM.STATUS_FIELD).click('left');
      cy.getByTestId(TEST_ID_USER_FORM.SAVE_BUTTON).click();
      cy.validateUrlChanged('/user');
      cy.log('Validate user changes');
      cy.searchUser(username);
      cy.getTableRowsBySelector(username).contains('Active').should('be.visible');
      cy.deleteUser(username);
    });

    it('Delete admin user should not be possible', () => {
      cy.log('Delete admin user should not be possible');
      cy.deleteUser('admin');
      cy.validateToastNotificationError('Sorry. You can\'t delete the administrator user');
    });

    it('Add user with username that already exists should not be possible', () => {
      const username = generateRandomId();
      const password = generateRandomId();
      cy.log('Delete admin user should not be possible');
      cy.log('Add the  first user');
      cy.addUser(username, password, PROFILE_TYPE_CODE);
      cy.log('Add a new user with username that already exists');
      cy.addUser(username, password, PROFILE_TYPE_CODE);
      cy.validateToastNotificationError(`The user '${username}' already exists`);
      cy.deleteUser(username);
    });
  });

  describe('User profile', () => {
    it('Should edit the user profile', () => {
      cy.log('Should edit and view the user profile');
      const username = generateRandomId();
      const password = generateRandomId();
      cy.addUser(username, password, PROFILE_TYPE_CODE);
      // Edit User Profile
      cy.editUserProfile(username, FULL_NAME, EMAIL);
      cy.validateToastNotificationOk('User profile has been updated');
      cy.log('Check edited user profile');
      cy.searchUser(username);
      cy.getTableRowsBySelector(username).should('be.visible');
      cy.getTableRowsBySelector(FULL_NAME).should('be.visible');
      cy.getTableRowsBySelector(EMAIL).should('be.visible');
      cy.getTableRowsBySelector(`Default user profile ${PROFILE_TYPE_CODE}`).should('be.visible');
      cy.openTableActionsByTestId(username);
      cy.getVisibleActionItemByClass(TEST_ID_USER_LIST_TABLE.ACTION_EDIT_PROFILE).click();
      cy.validateUrlChanged(`/userprofile/${username}`);
      cy.getInputByName(TEST_ID_USER_PROFILE_FORM.USERNAME_FIELD).should('have.value', username);
      cy.getInputByName(TEST_ID_USER_PROFILE_FORM.FULL_NAME_FIELD).should('have.value', FULL_NAME);
      cy.getInputByName(TEST_ID_USER_PROFILE_FORM.EMAIL_FIELD).should('have.value', EMAIL);
      cy.getSelectByName(TEST_ID_USER_PROFILE_FORM.PROFILE_TYPE_FIELD).within(() => {
        cy.get('option:selected')
          .should('have.text', 'Default user profile')
          .and('have.value', PROFILE_TYPE_CODE);
      });
      // View User Profile
      cy.log('Should view the user profile');
      cy.searchUser(username);
      cy.openTableActionsByTestId(username);
      cy.getVisibleActionItemByTestID(TEST_ID_USER_LIST_TABLE.ACTION_VIEW_PROFILE).click();
      cy.validateUrlChanged(`/user/view/${username}`);
      cy.getByTestId(TEST_ID_DETAIL_USER_TABLE.TABLE).contains(username).should('be.visible');
      cy.getByTestId(TEST_ID_DETAIL_USER_TABLE.TABLE).contains(FULL_NAME).should('be.visible');
      cy.getByTestId(TEST_ID_DETAIL_USER_TABLE.TABLE).contains(EMAIL).should('be.visible');
      cy.getByTestId(TEST_ID_DETAIL_USER_TABLE.TABLE).contains(`Default user profile ${PROFILE_TYPE_CODE}`)
        .should('be.visible');
      cy.getByTestId(TEST_ID_DETAIL_USER_TABLE.BACK_BUTTON).should('be.visible');
      cy.getByTestId(TEST_ID_DETAIL_USER_TABLE.BACK_BUTTON).click();
      cy.validateUrlChanged('/user');
      cy.deleteUser(username);
    });
  });

  describe('User authorizations', () => {
    it('Should edit the user authorizations', () => {
      cy.log('Should edit the user authorizations');
      const username = generateRandomId();
      const password = generateRandomId();
      cy.addUser(username, password, PROFILE_TYPE_CODE);
      // Edit Authorizations
      cy.searchUser(username);
      cy.openTableActionsByTestId(username);
      cy.getVisibleActionItemByClass(TEST_ID_USER_LIST_TABLE.ACTION_MANAGE_AUTHORIZATIONS).click();
      cy.validateUrlChanged(`/authority/${username}`);
      cy.contains('No authorizations yet').should('be.visible');
      // Add Authorizations
      cy.log('Should add the user authorizations');
      cy.getByTestId(TEST_ID_USER_AUTHORITY_TABLE.ADD_BUTTON).click();
      cy.getByTestId(TEST_ID_USER_AUTHORITY_MODAL.GROUP_FIELD).select(group.ID);
      cy.getByTestId(TEST_ID_USER_AUTHORITY_MODAL.ROLE_FIELD).select(role.ID);
      cy.getByTestId(TEST_ID_GENERIC_MODAL.BUTTON).contains('Add').click();
      cy.contains(group.DESCRIPTION).should('be.visible');
      cy.contains(role.DESCRIPTION).should('be.visible');
      cy.getTableRowsByTestId(TEST_ID_USER_AUTHORITY_TABLE.TABLE).should('have.length', 1);
      // Delete Authorizations
      cy.getByTestId(TEST_ID_USER_AUTHORITY_TABLE.DELETE_BUTTON).click();
      cy.contains('No authorizations yet').should('be.visible');
      cy.deleteUser(username);
    });
  });
});
