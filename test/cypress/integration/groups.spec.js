import { generateRandomId } from '../support/utils';

describe('Groups', () => {
  const groupName = generateRandomId();
  const groupCode = groupName.toLowerCase();

  beforeEach(() => {
    cy.appBuilderLogin();
    cy.openPageFromMenu(['Users', 'Groups']);
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  it('List page', () => {
    cy.log('should have the correct breadcrumbs');
    cy.validateBreadcrumbItems(['Users', 'Groups']);

    cy.log('should have the correct title');
    cy.getPageTitle().should('be.visible').and('have.text', 'Groups');

    cy.log('should have a table of groups');
    const groupsTableTestId = 'groups-table';
    cy.getByTestId(groupsTableTestId).should('be.visible');
    cy.getByTestId(groupsTableTestId).contains('Name').should('be.visible');
    cy.getByTestId(groupsTableTestId).contains('Code').should('be.visible');
    cy.getByTestId(groupsTableTestId).contains('Actions').should('be.visible');
    cy.getTableColsByTestId(groupsTableTestId).should('have.length', 3);

    cy.log('should have "Add" button');
    cy.getButtonByText('Add').should('be.visible');
  });

  it('Add page', () => {
    cy.getButtonByText('Add').click();

    cy.log('should have the correct breadcrumbs');
    cy.validateBreadcrumbItems(['Users', 'Groups', 'Add']);

    cy.log('should have the correct title');
    cy.getPageTitle().should('be.visible').and('have.text', 'Add');

    cy.log('should have a form with the correct fields and buttons');
    cy.getByTestId('group-form').should('be.visible');
    cy.getByName('name').should('be.visible');
    cy.getByName('code').should('be.visible');
    cy.getLabelByText('Name').should('be.visible');
    cy.getLabelByText('Code').should('be.visible');
    cy.getByTestId('group-form-cancel').should('be.visible').and('have.text', 'Cancel');
    cy.getByTestId('group-form-save').should('be.visible').and('have.text', 'Save').and('be.disabled');

    cy.log('should redirect back to list on cancel');
    cy.getButtonByText('Cancel').click();
    cy.getByTestId('groups-table').should('be.visible');

    cy.log('should redirect to list with new group after submitting the form');
    cy.getButtonByText('Add').click();
    cy.getByName('name').type(groupName);
    cy.getButtonByText('Save').click();
    cy.getByTestId('groups-table').should('be.visible');
    cy.getTableRowsBySelector(groupName).should('be.visible');
    cy.getTableRowsBySelector(groupCode).should('be.visible');
  });

  it('Edit page', () => {
    cy.clickTableActions(groupCode);
    cy.get(`[data-id=edit-${groupCode}`).find('a').click();

    cy.log('should have the correct breadcrumbs');
    cy.validateBreadcrumbItems(['Users', 'Groups', 'Edit']);

    cy.log('should have the correct title');
    cy.getPageTitle().should('be.visible').and('have.text', 'Edit');

    cy.log('should have a form with the correct fields and buttons');
    cy.getByTestId('group-form').should('be.visible');
    cy.getByName('name').should('be.visible');
    cy.getByName('code').should('be.visible').and('be.disabled');
    cy.getLabelByText('Name').should('be.visible');
    cy.getLabelByText('Code').should('be.visible');
    cy.getByTestId('group-form-cancel').should('be.visible').and('have.text', 'Cancel');
    cy.getByTestId('group-form-save').should('be.visible').and('have.text', 'Save');

    cy.log('should redirect back to list on cancel');
    cy.getButtonByText('Cancel').click();
    cy.getByTestId('groups-table').should('be.visible');

    cy.log('should redirect to list with updated group after submitting the form');
    const updatedGroupName = generateRandomId();
    cy.getButtonByText('Add').click();
    cy.getByName('name').clear().type(updatedGroupName);
    cy.getButtonByText('Save').click();
    cy.getByTestId('groups-table').should('be.visible');
    cy.getTableRowsBySelector(updatedGroupName).should('be.visible');
    cy.getTableRowsBySelector(groupCode).should('be.visible');
  });

  it('Delete', () => {
    cy.log('should delete the group after clicking and confirming the delete action');
    cy.clickTableActions(groupCode);
    cy.getByTestId('group-delete-action').filter(':visible').click();
    cy.getModalDialogByTitle('Delete group').should('be.visible');
    cy.getButtonByText('Delete').click();
    cy.getTableRowsBySelector(groupCode).should('not.exist');
  });
});
