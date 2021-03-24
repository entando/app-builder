import { generateRandomId } from '../support/utils';

import {
  TEST_ID_USER_AUTHORITY_MODAL,
  TEST_ID_USER_AUTHORITY_TABLE,
  TEST_ID_USER_FORM,
  TEST_ID_DETAIL_USER_TABLE,
  TEST_ID_USER_PROFILE_FORM,
  TEST_ID_USER_LIST_TABLE,
} from '../../../src/ui/test-const/user-test-const';

describe('Users Management', () => {
  const username = generateRandomId();
  const password = generateRandomId();
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
    cy.addUser(username, password, PROFILE_TYPE_CODE);
  });

  afterEach(() => {
    cy.deleteUser(username);
    cy.log('Validate user deletion');
    cy.openPageFromMenu(['Users', 'Management']);
    cy.contains(password).should('not.exist');
    cy.appBuilderLogout();
  });

  describe('User ', () => {
    it('Should add a new user', () => {
      cy.log('Validate user creation');
      cy.searchUser(username);
      cy.getTableRowsBySelector(username).should('be.visible');
      cy.getTableRowsByTestId(TEST_ID_USER_LIST_TABLE.TABLE).should('have.length', 1);
    });

    it('Should update a user', () => {
      cy.log('Update the user');
      const newPassword = 'new_password_tests';
      cy.searchUser(username);
      cy.getTableRowsBySelector(username).contains('Not active').should('be.visible');
      cy.clickTableActions(username);
      cy.getVisibleActionItemByClass(TEST_ID_USER_LIST_TABLE.ACTION_EDIT_USER).click();
      cy.getByName(TEST_ID_USER_FORM.USERNAME_FIELD).should('have.value', username);
      cy.getByName(TEST_ID_USER_FORM.PASSWORD_FIELD).type(newPassword);
      cy.getByName(TEST_ID_USER_FORM.CONFIRM_PASSWORD_FIELD).type(newPassword);
      cy.getByTestId(TEST_ID_USER_FORM.STATUS_FIELD).click('left');
      cy.getByTestId(TEST_ID_USER_FORM.SAVE_BUTTON).click();
      cy.validateUrlChanged('/user');
      cy.log('Validate user changes');
      cy.searchUser(username);
      cy.getTableRowsBySelector(username).contains('Active').should('be.visible');
    });
  });

  describe('User profile', () => {
    it('Should edit the user profile', () => {
      cy.log('Should edit and view the user profile');
      // Edit User Profile
      cy.editUserProfile(username, FULL_NAME, EMAIL);
      cy.validateToastNotificationOk('User profile has been updated');
      cy.log('Check edited user profile');
      cy.searchUser(username);
      cy.getTableRowsBySelector(username).should('be.visible');
      cy.getTableRowsBySelector(FULL_NAME).should('be.visible');
      cy.getTableRowsBySelector(EMAIL).should('be.visible');
      cy.getTableRowsBySelector(`Default user profile ${PROFILE_TYPE_CODE}`).should('be.visible');
      cy.clickTableActions(username);
      cy.getVisibleActionItemByClass(TEST_ID_USER_LIST_TABLE.ACTION_EDIT_PROFILE).click();
      cy.validateUrlChanged(`/userprofile/${username}`);
      cy.getByName(TEST_ID_USER_PROFILE_FORM.USERNAME_FIELD).should('have.value', username);
      cy.getByName(TEST_ID_USER_PROFILE_FORM.FULL_NAME_FIELD).should('have.value', FULL_NAME);
      cy.getByName(TEST_ID_USER_PROFILE_FORM.EMAIL_FIELD).should('have.value', EMAIL);
      cy.getByName(TEST_ID_USER_PROFILE_FORM.PROFILE_TYPE_FIELD).within(() => {
        cy.get('option:selected')
          .should('have.text', 'Default user profile')
          .and('have.value', PROFILE_TYPE_CODE);
      });
      // View User Profile
      cy.log('Should view the user profile');
      cy.searchUser(username);
      cy.clickTableActions(username);
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
    });
  });

  describe('User authorizations', () => {
    it('Should edit the user authorizations', () => {
      cy.log('Should edit the user authorizations');
      // Edit Authorizations
      cy.searchUser(username);
      cy.clickTableActions(username);
      cy.getVisibleActionItemByClass(TEST_ID_USER_LIST_TABLE.ACTION_MANAGE_AUTHORIZATIONS).click();
      cy.validateUrlChanged(`/authority/${username}`);
      cy.contains('No authorizations yet').should('be.visible');
      // Add Authorizations
      cy.log('Should add the user authorizations');
      cy.getByTestId(TEST_ID_USER_AUTHORITY_TABLE.ADD_BUTTON).click();
      cy.getByTestId(TEST_ID_USER_AUTHORITY_MODAL.GROUP_FIELD).select(group.ID);
      cy.getByTestId(TEST_ID_USER_AUTHORITY_MODAL.ROLE_FIELD).select(role.ID);
      cy.getByTestId(TEST_ID_USER_AUTHORITY_MODAL.ADD_BUTTON).click();
      cy.contains(group.DESCRIPTION).should('be.visible');
      cy.contains(role.DESCRIPTION).should('be.visible');
      cy.getTableRowsByTestId(TEST_ID_USER_AUTHORITY_TABLE.TABLE).should('have.length', 1);
      // Delete Authorizations
      cy.getByTestId(TEST_ID_USER_AUTHORITY_TABLE.DELETE_BUTTON).click();
      cy.contains('No authorizations yet').should('be.visible');
    });
  });
});