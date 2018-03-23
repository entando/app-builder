import { createSelector } from 'reselect';

export const getRoles = state => state.roles;
export const getRolesIdList = state => state.roles.list;
export const getRolesMap = state => state.roles.map;

export const getRolesList = createSelector(
  [getRolesMap, getRolesIdList],
  (rolesMap, idListRoles) => idListRoles.map(id => (rolesMap[id])),
);
