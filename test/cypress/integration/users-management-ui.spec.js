import {
  TEST_ID_USER_LIST_TABLE,
  TEST_ID_DETAIL_USER_TABLE,
  TEST_ID_USER_SEARCH_FORM,
  TEST_ID_USER_PROFILE_FORM,
  TEST_ID_USER_LIST_PAGE,
  TEST_ID_USER_FORM,
  TEST_ID_USER_AUTHORITY_TABLE,
  TEST_ID_USER_AUTHORITY_PAGE_FORM, TEST_ID_USER_AUTHORITY_MODAL,
} from '../../../src/ui/test-const/user-test-const';
import TEST_ID_GENERIC_MODAL from '../../../src/ui/test-const/test-const';

describe('Users Management', () => {
  const USERNAME = 'admin';

  beforeEach(() => {
    cy.appBuilderLogin();
    cy.closeWizardAppTour();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  describe('Validate UI', () => {
    it('User management page', () => {
      cy.log('Should have all defined page components');
      cy.openPageFromMenu(['Users', 'Management']);
      // Page title
      cy.getPageTitle().should('be.visible').and('have.text', 'Users');
      // Page breadcrumb
      cy.validateBreadcrumbItems(['Users', 'Management']);
      // Search box title
      cy.getByTestId(TEST_ID_USER_SEARCH_FORM.FORM).within(() => {
        cy.get('h3').contains('Search').should('be.visible');
      });
      // Form Fields
      cy.getByName('username').should('be.visible');
      cy.getByTestId(TEST_ID_USER_SEARCH_FORM.WITH_PROFILE_FIELD).should('be.visible');
      cy.getByTestId(TEST_ID_USER_SEARCH_FORM.SEARCH_BUTTON).should('be.visible');
      cy.getByTestId(TEST_ID_USER_LIST_TABLE.TABLE).should('be.visible');
      // Table
      cy.getByTestId(TEST_ID_USER_LIST_TABLE.TABLE).should('be.visible');
      cy.getByTestId(TEST_ID_USER_LIST_TABLE.TABLE).contains('Username').should('be.visible');
      cy.getByTestId(TEST_ID_USER_LIST_TABLE.TABLE).contains('Full Name').should('be.visible');
      cy.getByTestId(TEST_ID_USER_LIST_TABLE.TABLE).contains('Email').should('be.visible');
      cy.getByTestId(TEST_ID_USER_LIST_TABLE.TABLE).contains('Profile Type').should('be.visible');
      cy.getByTestId(TEST_ID_USER_LIST_TABLE.TABLE).contains('Status').should('be.visible');
      cy.getByTestId(TEST_ID_USER_LIST_TABLE.TABLE).contains('Actions').should('be.visible');
      cy.getTableColsByTestId(TEST_ID_USER_LIST_TABLE.TABLE).should('have.length', 6);
      // Button
      cy.getByTestId(TEST_ID_USER_LIST_PAGE.ADD_USER_BUTTON).should('be.visible').and('have.text', 'Add');
    });

    it('User edit page', () => {
      cy.log('Should have all defined page components');
      cy.searchUser(USERNAME);
      cy.clickTableActions(USERNAME);
      cy.getVisibleActionItemByClass(TEST_ID_USER_LIST_TABLE.ACTION_EDIT_USER).click();
      cy.validateUrlChanged(`/user/edit/${USERNAME}`);
      // Page title
      cy.getPageTitle().should('be.visible').and('have.text', 'Edit');
      // Page breadcrumb
      cy.validateBreadcrumbItems(['Users', 'Management', 'Edit']);
      // Form Fields
      cy.getByName(TEST_ID_USER_FORM.USERNAME_FIELD).should('be.visible');
      cy.getByName(TEST_ID_USER_FORM.PASSWORD_FIELD).should('be.visible');
      cy.getByName(TEST_ID_USER_FORM.CONFIRM_PASSWORD_FIELD).should('be.visible');
      cy.getByTestId(TEST_ID_USER_FORM.STATUS_FIELD).should('be.visible');
      cy.getByTestId(TEST_ID_USER_FORM.RESET_FIELD).should('be.visible');
      // Labels
      cy.getLabelByText('Username').should('be.visible');
      cy.getLabelByText('Password').should('be.visible');
      cy.getLabelByText('Confirm password').should('be.visible');
      cy.getLabelByText('Registration').should('be.visible');
      cy.getLabelByText('Last login').should('be.visible');
      cy.getLabelByText('Last password change').should('be.visible');
      cy.getLabelByText('Reset').should('be.visible');
      cy.getLabelByText('Status').should('be.visible');
      // Button
      cy.getByTestId(TEST_ID_USER_FORM.SAVE_BUTTON).should('be.visible').and('have.text', 'Save');
    });

    it('User management edit profile page', () => {
      cy.log('Should have all defined page components');
      cy.searchUser(USERNAME);
      cy.clickTableActions(USERNAME);
      cy.getVisibleActionItemByClass(TEST_ID_USER_LIST_TABLE.ACTION_EDIT_PROFILE).click();
      cy.validateUrlChanged(`/userprofile/${USERNAME}`);
      // Page title
      cy.getPageTitle().should('be.visible').and('have.text', 'Edit');
      // Page breadcrumb
      cy.validateBreadcrumbItems(['Users', 'Management', 'Edit user profile']);
      // Form Fields
      cy.getByName(TEST_ID_USER_PROFILE_FORM.PROFILE_TYPE_FIELD).should('be.visible');
      cy.getByName(TEST_ID_USER_PROFILE_FORM.USERNAME_FIELD).should('be.visible').and('be.disabled');
      cy.getByName(TEST_ID_USER_PROFILE_FORM.FULL_NAME_FIELD).should('be.visible');
      cy.getByName(TEST_ID_USER_PROFILE_FORM.EMAIL_FIELD).should('be.visible');
      // Labels
      cy.getLabelByText('Profile Type').should('be.visible');
      cy.getLabelByText('Username').should('be.visible');
      cy.getLabelByText('Full Name').should('be.visible');
      cy.getLabelByText('Email').should('be.visible');
      // Button
      cy.getByTestId(TEST_ID_USER_PROFILE_FORM.SAVE_BUTTON).should('be.visible').and('have.text', 'Save');
    });

    it('User management view profile page', () => {
      cy.log('Should have all defined page components');
      cy.searchUser(USERNAME);
      cy.clickTableActions(USERNAME);
      cy.getVisibleActionItemByTestID(TEST_ID_USER_LIST_TABLE.ACTION_VIEW_PROFILE).click();
      cy.validateUrlChanged(`/user/view/${USERNAME}`);
      // Page title
      cy.getPageTitle().should('be.visible').and('have.text', 'Details');
      // Page breadcrumb
      cy.validateBreadcrumbItems(['Users', 'Management', 'Details']);
      // Table
      cy.getByTestId(TEST_ID_DETAIL_USER_TABLE.TABLE).should('be.visible');
      cy.getByTestId(TEST_ID_DETAIL_USER_TABLE.TABLE).contains('Username').should('be.visible');
      cy.getByTestId(TEST_ID_DETAIL_USER_TABLE.TABLE).contains('Full Name').should('be.visible');
      cy.getByTestId(TEST_ID_DETAIL_USER_TABLE.TABLE).contains('Email').should('be.visible');
      cy.getByTestId(TEST_ID_DETAIL_USER_TABLE.TABLE).contains('Profile Type').should('be.visible');
      // Button
      cy.getByTestId(TEST_ID_DETAIL_USER_TABLE.BACK_BUTTON).should('be.visible').and('have.text', 'Back');
    });

    it('User authorizations page', () => {
      cy.log('Should edit the user authorizations');
      // Edit Authorizations
      cy.searchUser(USERNAME);
      cy.clickTableActions(USERNAME);
      cy.getVisibleActionItemByClass(TEST_ID_USER_LIST_TABLE.ACTION_MANAGE_AUTHORIZATIONS).click();
      cy.validateUrlChanged(`/authority/${USERNAME}`);
      // Page title
      cy.getPageTitle().should('be.visible').and('have.text', `Authorizations for ${USERNAME}`);
      // Page breadcrumb
      cy.validateBreadcrumbItems(['Users', 'Management', 'Authorizations']);
      // Table
      cy.getByTestId(TEST_ID_USER_AUTHORITY_TABLE.TABLE).should('be.visible');
      cy.getByTestId(TEST_ID_USER_AUTHORITY_TABLE.TABLE).contains('User Group').should('be.visible');
      cy.getByTestId(TEST_ID_USER_AUTHORITY_TABLE.TABLE).contains('User Role').should('be.visible');
      cy.getByTestId(TEST_ID_USER_AUTHORITY_TABLE.TABLE).contains('Actions').should('be.visible');
      cy.getTableColsByTestId(TEST_ID_USER_AUTHORITY_TABLE.TABLE).should('have.length', 3);
      // Buttons
      cy.getByTestId(TEST_ID_USER_AUTHORITY_TABLE.ADD_BUTTON).should('be.visible').and('have.text', 'Add new Authorization');
      cy.getByTestId(TEST_ID_USER_AUTHORITY_TABLE.DELETE_BUTTON).should('be.visible');
      cy.getByTestId(TEST_ID_USER_AUTHORITY_PAGE_FORM.SAVE_BUTTON).should('be.visible').and('have.text', 'Save');
      // Add authorization modal
      cy.getByTestId(TEST_ID_USER_AUTHORITY_TABLE.ADD_BUTTON).click();
      cy.getModalDialogByTitle('New authorizations').should('be.visible');
      cy.getByTestId(TEST_ID_USER_AUTHORITY_MODAL.ROLE_FIELD).should('be.visible');
      cy.getByTestId(TEST_ID_USER_AUTHORITY_MODAL.GROUP_FIELD).should('be.visible');
      cy.getByTestId(TEST_ID_GENERIC_MODAL.BUTTON).contains('Cancel').should('be.visible');
      cy.getByTestId(TEST_ID_GENERIC_MODAL.BUTTON).contains('Add').should('be.visible');
    });
  });
});
