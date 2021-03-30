import { generateRandomId } from '../support/utils';

import { TEST_ID_ROLE_LIST_TABLE } from '../../../src/ui/test-const/role-test-const';

describe('User Roles', () => {
  const roleName = generateRandomId();
  const roleCode = generateRandomId();

  beforeEach(() => {
    cy.appBuilderLogin();
    cy.closeWizardAppTour();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  describe('Role ', () => {
    it('Should add a new role', () => {
      cy.log('Validate role creation');
      cy.addRole(roleName, roleCode);
      cy.openPageFromMenu(['Users', 'Roles']);
      cy.getTableRowsBySelector(roleCode).should('be.visible');
      cy.deleteRole(roleCode);
    });

    it('Should update a role and verify change on details page', () => {
      cy.log('Update the role');
      cy.addRole(roleName, roleCode);
      const newRoleName = 'new_rolename_tests';
      cy.openPageFromMenu(['Users', 'Roles']);
      cy.editRole(roleCode, newRoleName);
      cy.validateUrlChanged('/role');
      cy.log('Validate user changes');
      cy.openPageFromMenu(['Users', 'Roles']);
      cy.getTableRowsBySelector(roleCode).contains(newRoleName).should('be.visible');
      cy.clickTableActions(roleCode);
      cy.getVisibleActionItemByClass(TEST_ID_ROLE_LIST_TABLE.ACTION_DETAIL_ROLE).click();
      cy.validateUrlChanged(`/role/view/${roleCode}`);
      cy.contains(newRoleName).should('be.visible');
      cy.deleteRole(roleCode);
    });

    it('Should delete an unreferenced role', () => {
      cy.log('Delete the role');
      cy.addRole(roleName, roleCode);
      cy.contains(roleCode).should('be.visible');
      cy.deleteRole(roleCode);
      cy.contains(roleCode).should('not.be.visible');
    });
    it('Should forbid deletion of an assigned role to a user', () => {
      cy.log('Delete the role');
      const adminRoleCode = 'admin';
      cy.openPageFromMenu(['Users', 'Roles']);
      cy.contains(adminRoleCode).should('be.visible');
      cy.clickTableActions(adminRoleCode);
      cy.getVisibleActionItemByTestID(TEST_ID_ROLE_LIST_TABLE.ACTION_DELETE_ROLE).click();
      cy.getModalDialogByTitle('Delete role').should('not.be.visible');
    });
  });
});

