import { createSelector } from 'reselect';

export const getPermissions = state => state.permissions;
export const getPermissionsIdList = state => state.permissions.list;
export const getPermissionsMap = state => state.permissions.map;

export const getPermissionsList = createSelector(
  [getPermissionsMap, getPermissionsIdList],
  (permissionsMap, idListPermissions) => idListPermissions.map(id => (permissionsMap[id])),
);

export const getLoggedUserPermissions = (
  createSelector([getPermissions], permissions => permissions.loggedUser)
);
