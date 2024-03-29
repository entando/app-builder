import { createSelector } from 'reselect';

export const getPermissions = state => state.permissions;
export const getPermissionsIdList = state => state.permissions.list;
export const getPermissionsMap = state => state.permissions.map;
export const getMyGroupPermissions = state => state.permissions.myGroupPermissions;

export const getLoggedUserPermissionsLoaded = state => state.permissions
  .loggedUserPermissionsLoaded;

export const getPermissionsList = createSelector(
  [getPermissionsMap, getPermissionsIdList],
  (permissionsMap, idListPermissions) => idListPermissions.map(id => (permissionsMap[id])),
);

export const getLoggedUserPermissions = (
  createSelector([getPermissions], permissions => permissions.loggedUser)
);

export const getLoggedUserGroup = (
  createSelector([getPermissions], permissions => permissions.loggedUserGroup)
);
