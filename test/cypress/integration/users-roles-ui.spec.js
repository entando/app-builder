import { TEST_ID_ROLE_LIST_TABLE, TEST_ID_ROLE_LIST_PAGE, TEST_ID_ROLE_FORM } from '../../../src/ui/test-const/role-test-const';

describe('User Roles', () => {
  const ROLE_NAME = 'admin';

  beforeEach(() => {
    cy.appBuilderLogin();
    cy.closeWizardAppTour();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  describe('Validate UI', () => {
    it('Roles page', () => {
      cy.log('Should have all defined page components');
      cy.openPageFromMenu(['Users', 'Roles']);
      // Page title
      cy.getPageTitle().should('be.visible').and('have.text', 'Roles');
      // Page breadcrumb
      cy.validateBreadcrumbItems(['Users', 'Roles']);
      cy.getByTestId(TEST_ID_ROLE_LIST_TABLE.TABLE).should('be.visible');
      // Table
      cy.getByTestId(TEST_ID_ROLE_LIST_TABLE.TABLE).should('be.visible');
      cy.getByTestId(TEST_ID_ROLE_LIST_TABLE.TABLE).contains('Name').should('be.visible');
      cy.getByTestId(TEST_ID_ROLE_LIST_TABLE.TABLE).contains('Code').should('be.visible');
      cy.getByTestId(TEST_ID_ROLE_LIST_TABLE.TABLE).contains('Actions').should('be.visible');
      cy.getTableColsByTestId(TEST_ID_ROLE_LIST_TABLE.TABLE).should('have.length', 3);
      // Button
      cy.getByTestId(TEST_ID_ROLE_LIST_PAGE.ADD_ROLE_BUTTON).should('be.visible').and('have.text', 'Add');
    });

    it('Role edit page', () => {
      cy.openPageFromMenu(['Users', 'Roles']);
      cy.log('Should have all defined page components');
      cy.openTableActionsByTestId(ROLE_NAME);
      cy.getVisibleActionItemByClass(TEST_ID_ROLE_LIST_TABLE.ACTION_EDIT_ROLE).click();
      cy.validateUrlChanged(`/role/edit/${ROLE_NAME}`);
      // Page title
      cy.getPageTitle().should('be.visible').and('have.text', 'Edit');
      // Page breadcrumb
      cy.validateBreadcrumbItems(['Users', 'Roles', 'Edit']);
      // Form Fields
      cy.getInputByName(TEST_ID_ROLE_FORM.NAME_FIELD).should('be.visible');
      cy.getInputByName(TEST_ID_ROLE_FORM.CODE_FIELD).should('be.visible');
      // Labels
      // for some weird reason this first label cannot be found via getLabelByText function
      cy.contains('Content Editing').should('be.visible');
      cy.getLabelByText('Access to Administration Area').should('be.visible');
      cy.getLabelByText('Asset Editing').should('be.visible');
      cy.getLabelByText('Content Supervision').should('be.visible');
      cy.getLabelByText('User Profile Editing').should('be.visible');
      cy.getLabelByText('Operations on Categories').should('be.visible');
      cy.getLabelByText('Review Management').should('be.visible');
      cy.getLabelByText('View Users and Profiles').should('be.visible');
      cy.getLabelByText('User Management').should('be.visible');
      cy.getLabelByText('Operations on Pages').should('be.visible');
      cy.getLabelByText('All functions').should('be.visible');
      // Button
      cy.getByTestId(TEST_ID_ROLE_FORM.CANCEL_BUTTON).should('be.visible').and('have.text', 'Cancel');
      cy.getByTestId(TEST_ID_ROLE_FORM.SAVE_BUTTON).should('be.visible').and('have.text', 'Save');
    });

    it('View role details page', () => {
      cy.log('Should have all defined page components');
      cy.openPageFromMenu(['Users', 'Roles']);
      cy.openTableActionsByTestId(ROLE_NAME);
      cy.getVisibleActionItemByClass(TEST_ID_ROLE_LIST_TABLE.ACTION_DETAIL_ROLE).click();
      cy.validateUrlChanged(`/role/view/${ROLE_NAME}`);
      // Page title
      cy.getPageTitle().should('be.visible').and('have.text', 'Details');
      // Page breadcrumb
      cy.validateBreadcrumbItems(['Configuration', 'Roles', 'Details']);
      // Labels
      cy.contains('Code').should('be.visible');
      cy.contains('Name').should('be.visible');
      cy.contains('Permissions').should('be.visible');
      cy.contains('Referenced users').should('be.visible');
    });
  });
});
