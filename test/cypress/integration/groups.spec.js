import { generateRandomId } from '../support/utils';

describe('Groups', () => {
  let groupName;
  let groupCode;

  beforeEach(() => {
    cy.appBuilderLogin();

    groupName = generateRandomId();
    groupCode = groupName.toLowerCase();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  it('Add group', () => {
    cy.log('should redirect to list with new group after submitting the form');
    cy.addGroup(groupName);
    cy.getByTestId('groups-table').should('be.visible');
    cy.getTableRowsBySelector(groupName).should('be.visible');
    cy.getTableRowsBySelector(groupCode).should('be.visible');

    cy.log('should redirect back to list on cancel');
    cy.getButtonByText('Add').click();
    cy.getButtonByText('Cancel').click();
    cy.getByTestId('groups-table').should('be.visible');

    cy.deleteGroup(groupCode);
  });

  it('Edit group', () => {
    cy.addGroup(groupName);

    cy.log('should redirect to list with updated group after submitting the form');
    const updatedGroupName = generateRandomId();
    cy.editGroup(groupCode, updatedGroupName);
    cy.getByTestId('groups-table').should('be.visible');
    cy.getTableRowsBySelector(updatedGroupName).should('be.visible');
    cy.getTableRowsBySelector(groupCode).should('be.visible');

    cy.log('should redirect back to list on cancel');
    cy.clickTableActions(groupCode);
    cy.get(`[data-id=edit-${groupCode}`).find('a').click();
    cy.getButtonByText('Cancel').click();
    cy.getByTestId('groups-table').should('be.visible');

    cy.deleteGroup(groupCode);
  });

  it('Delete group', () => {
    cy.addGroup(groupName);

    cy.log('should delete the group after clicking and confirming the delete action');
    cy.deleteGroup(groupCode);
    cy.getTableRowsBySelector(groupCode).should('not.exist');
  });
});
