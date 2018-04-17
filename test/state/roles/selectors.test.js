
import { LIST_ROLES_OK, ROLES_NORMALIZED } from 'test/mocks/roles';
import { PERMISSIONS_NORMALIZED } from 'test/mocks/permissions';

import {
  getRoles,
  getRolesIdList,
  getRolesMap,
  getRolesList,
  getSelectedRolePermissions,
  getUserRefs,
  getSelectedRolePermissionsList,
  getSelectedRole,
} from 'state/roles/selectors';

const rolePermissionsList = [
  'content Editing',
  'manage Categories',
  'manage Pages',
  'operations On Resources',
  'validate Contents',
];

describe('state/roles/selectors', () => {
  it('getRoles(state) returns the roles object', () => {
    const selected = getRoles(ROLES_NORMALIZED);
    expect(selected).toBe(ROLES_NORMALIZED.roles);
  });

  it('verify getRolesIdList selector', () => {
    expect(getRolesIdList(ROLES_NORMALIZED)).toEqual(ROLES_NORMALIZED.roles.list);
  });

  it('verify getRolesMap selector', () => {
    expect(getRolesMap(ROLES_NORMALIZED)).toEqual(ROLES_NORMALIZED.roles.map);
  });

  it('verify getUserList selector', () => {
    expect(getRolesList(ROLES_NORMALIZED)).toEqual(LIST_ROLES_OK);
  });

  it('verify getSelectedRolePermissions selector', () => {
    expect((getSelectedRolePermissions(ROLES_NORMALIZED)))
      .toEqual(ROLES_NORMALIZED.roles.selected.permissions);
  });

  it('verify getUserRefs selector', () => {
    expect(getUserRefs(ROLES_NORMALIZED)).toEqual(ROLES_NORMALIZED.roles.selected.userReferences);
  });

  it('verify getSelectedRolePermissionsList selector', () => {
    expect(getSelectedRolePermissionsList({ ...ROLES_NORMALIZED, ...PERMISSIONS_NORMALIZED }))
      .toEqual(rolePermissionsList);
  });

  it('verify getSelectedRole selector', () => {
    expect(getSelectedRole(ROLES_NORMALIZED))
      .toEqual(ROLES_NORMALIZED.roles.selected);
  });
});
