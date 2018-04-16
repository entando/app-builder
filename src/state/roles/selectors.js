import { createSelector } from 'reselect';
import { get } from 'lodash';
import { getPermissionsList } from 'state/permissions/selectors';

export const getRoles = state => state.roles;
export const getRolesIdList = state => state.roles.list;
export const getRolesMap = state => state.roles.map;
export const getSelectedRole = state => state.roles.selected;
export const getSelectedRolePermissions = state => get(state.roles, 'selected.permissions', []);
export const getUserRefs = state => state.roles.selected.userReferences;

export const getRolesList = createSelector(
  getRolesMap, getRolesIdList,
  (rolesMap, idListRoles) => idListRoles.map(id => (rolesMap[id])),
);

export const getSelectedRolePermissionsList = createSelector(
  getSelectedRolePermissions, getPermissionsList,
  (rolePermissions, permissions) => {
    if (rolePermissions && permissions) {
      return permissions.filter(permission =>
        rolePermissions[permission.code]).map(permission => permission.descr);
    }
    return [];
  },
);
