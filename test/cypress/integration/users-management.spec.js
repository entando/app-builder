import { generateRandomId } from '../support/utils';

describe('Users', () => {
  const username = generateRandomId();
  const PROFILE_TYPE_CODE = 'PFL';
  const FULL_NAME = 'Test Test';
  const EMAIL = 'user-test-email@entando.com';

  beforeEach(() => {
    cy.appBuilderLogin();
    cy.openPageFromMenu(['Users', 'Management'], true);
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  describe('Add a new user ', () => {
    it('Should create a new user', () => {
      const password = generateRandomId();
      cy.log('Create a new user');
      cy.getByTestId('UserListPage__AddUserButton').click();
      cy.getByTestId('UserForm__UsernameField').type(username);
      cy.getByTestId('UserForm__PasswordField').type(password);
      cy.getByTestId('UserForm__PasswordConfirmField').type(password);
      cy.getByTestId('UserForm__ProfileTypeField').select(PROFILE_TYPE_CODE);
      cy.getByTestId('UserForm__SaveButton').click();
      cy.log('Validate user creation');
      cy.getTableRowsBySelector(username).should('be.visible');
    });
  });

  describe('Validate user management page components', () => {
    it('Validate user management page components', () => {
      cy.validateBreadcrumbItems(['Users', 'Management']);
      cy.get('h1').contains('Users');
      cy.getByTestId('UserSearchForm_Form').should('be.visible').within(() => {
        cy.get('h3').contains('Search');
      });
      cy.getByTestId('UserSearchForm__UsernameField').should('be.visible');
      cy.getByTestId('UserSearchForm__WithProfileField').should('be.visible');
      cy.getByTestId('UserSearchForm__SearchButton').should('be.visible');
      cy.get('table').should('be.visible');
      cy.getByTestId('UserListPage__AddUserButton').should('be.visible');
    });
  });

  describe('Validate user management edit profile page components', () => {
    it('Validate user management edit profile page components', () => {
      cy.log('Validate user management edit profile page components');
      cy.getTableActions(username).click();
      cy.getVisibleActionItemByClass('UserListMenuAction__menu-item-edit-profile').click();
      cy.validateUrlChanged(`/userprofile/${username}`);
      cy.validateBreadcrumbItems(['Users', 'Management', 'Edit user profile']);
      cy.getByTestId('UserProfileForm__UsernameField').should('be.visible')
        .and('be.disabled');
      cy.getByTestId('UserProfileForm__fullnameField').should('be.visible');
      cy.getByTestId('UserProfileForm__emailField').should('be.visible');
      cy.getByTestId('UserProfileForm__ProfileTypeField').should('be.visible');
    });
  });

  describe('Validate user management view profile page components', () => {
    it('Validate user management view profile page components', () => {
      cy.log('Validate user management view profile page components');
      cy.getTableActions(username).click();
      cy.getVisibleActionItemByClass('UserListMenuAction__menu-item-view-profile').click();
      cy.validateUrlChanged(`/user/view/${username}`);
      cy.validateBreadcrumbItems(['Users', 'Management', 'Details']);
      cy.get('table').contains('Username').should('be.visible');
      cy.get('table').contains('Full Name').should('be.visible');
      cy.get('table').contains('Email').should('be.visible');
      cy.get('table').contains('Profile Type').should('be.visible');
      cy.getByTestId('DetailUserTable__BackButton').should('be.visible');
    });
  });

  describe('Search an existing user ', () => {
    it('Should find a user', () => {
      cy.log('Search a user');
      cy.getByTestId('UserSearchForm__UsernameField').type(username);
      cy.getByTestId('UserSearchForm__SearchButton').click();
      cy.getTableRows().should('have.length', 1);
      cy.getTableRowsBySelector(username).should('be.visible');
    });
  });

  describe('Update an existing user ', () => {
    it('Should update an existing existing user', () => {
      cy.log('Update the user');
      const newPassword = generateRandomId();
      cy.getTableRowsBySelector(username).contains('Not active').should('be.visible');
      cy.getTableActions(username).click();
      cy.getVisibleActionItemByClass('UserListMenuAction__menu-item-edit').click();
      cy.getByTestId('UserForm__UsernameField').should('have.value', username);
      cy.getByTestId('UserForm__PasswordField').type(newPassword);
      cy.getByTestId('UserForm__PasswordConfirmField').type(newPassword);
      cy.getByTestId('UserForm__StatusField').click('left');
      cy.getByTestId('UserForm__SaveButton').click();
      cy.log('Validate user changes');
      cy.getTableRowsBySelector(username).contains('Active').should('be.visible');
    });
  });

  describe('Edit user profile', () => {
    it('Should edit the user profile', () => {
      cy.log('Edit the user profile');
      cy.getTableActions(username).click();
      cy.getVisibleActionItemByClass('UserListMenuAction__menu-item-edit-profile').click();
      cy.validateUrlChanged(`/userprofile/${username}`);
      cy.getByTestId('UserProfileForm__fullnameField').type(FULL_NAME);
      cy.getByTestId('UserProfileForm__emailField').type(EMAIL);
      cy.getByTestId('UserProfileForm__SaveButton').click();
      cy.validateToastNotificationOk('User profile has been updated');
    });
  });

  describe('View the user profile and go back', () => {
    it('Should view the user profile', () => {
      cy.log('View the user profile');
      cy.getTableActions(username).click();
      cy.getVisibleActionItemByClass('UserListMenuAction__menu-item-view-profile').click();
      cy.validateUrlChanged(`/user/view/${username}`);
      cy.contains(username).should('be.visible');
      cy.contains('Details').should('be.visible');
      cy.get('table').contains(FULL_NAME).should('be.visible');
      cy.get('table').contains(EMAIL).should('be.visible');
      cy.get('table').contains(`Default user profile ${PROFILE_TYPE_CODE}`).should('be.visible');
      cy.getByTestId('DetailUserTable__BackButton').should('be.visible');
      cy.getByTestId('DetailUserTable__BackButton').click();
      cy.validateUrlChanged('/user');
    });
  });

  describe('Check edited user profile', () => {
    it('Check edited user profile', () => {
      cy.log('Check edited user profile');
      cy.getTableRowsBySelector(username).should('be.visible');
      cy.getTableRowsBySelector(FULL_NAME).should('be.visible');
      cy.getTableRowsBySelector(EMAIL).should('be.visible');
      cy.getTableRowsBySelector(`Default user profile ${PROFILE_TYPE_CODE}`).should('be.visible');
      cy.getTableActions(username).click();
      cy.getVisibleActionItemByClass('UserListMenuAction__menu-item-edit-profile').click();
      cy.wait(1000);
      cy.validateUrlChanged(`/userprofile/${username}`);
      cy.getByTestId('UserProfileForm__UsernameField').should('have.value', username);
      cy.getByTestId('UserProfileForm__fullnameField').should('have.value', FULL_NAME);
      cy.getByTestId('UserProfileForm__emailField').should('have.value', EMAIL);
      cy.getByTestId('UserProfileForm__ProfileTypeField').within(() => {
        cy.get('option:selected')
          .should('have.text', 'Default user profile')
          .and('have.value', PROFILE_TYPE_CODE);
      });
    });
  });

  describe('Delete a user ', () => {
    it('Should delete an existing user', () => {
      cy.log('Delete the user');
      cy.getTableActions(username).click();
      cy.getVisibleActionItemByClass('UserListMenuAction__menu-item-delete').click();
      cy.getModalDialog('Delete user').should('be.visible');
      cy.getById('DeleteUserModal__button-delete').click();
      cy.log('Validate user deletion');
      cy.contains(username).should('not.exist');
    });
  });
});

