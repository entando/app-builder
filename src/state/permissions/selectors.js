import { createSelector } from 'reselect';
import { get } from 'lodash';

export const getPermissions = state => state.permissions;
export const getPermissionsIdList = state => state.permissions.list;
export const getPermissionsMap = state => state.permissions.map;

export const getPermissionsList = createSelector(
  [getPermissionsMap, getPermissionsIdList],
  (permissionsMap, idListPermissions) => idListPermissions.map(id => (permissionsMap[id])),
);

export const getLoggedUser = (
  createSelector([getPermissions], permissions => permissions.loggedUser || {})
);

export const getLoggedUserGroups = (
  createSelector([getLoggedUser], loggedUser => get(loggedUser, 'groups', null))
);

export const getLoggedUserPermissions = (
  createSelector([getLoggedUser], loggedUser => get(loggedUser, 'roles', null))
);
