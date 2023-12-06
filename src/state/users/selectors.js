import { createSelector } from 'reselect';
import { getGroupsMap } from 'state/groups/selectors';
import { getRolesMap } from 'state/roles/selectors';
import { isEmpty } from 'lodash';

export const getUsers = state => state.users;
export const getUsersIdList = state => state.users.list;
export const getUsersMap = state => state.users.map;
export const getSelectedUser = state => state.users.selected;
export const getSelectedUserActionAuthorities = state => state.users.authorities.action;
export const getSelectedUserAuthoritiesList = state => state.users.authorities.list;
export const getUsersTotal = state => state.users.total;
export const getUserSearchTerm = state => state.users.searchTerm;

export const getUserList = createSelector(
  [getUsersMap, getUsersIdList],
  (UsersMap, idList) => idList.map(id => (UsersMap[id])),
);

export const makeGroupRolesCombo = (groupRoleCombo, groups, roles) => {
  if (!isEmpty(groupRoleCombo) && !isEmpty(groups) && !isEmpty(roles)) {
    return groupRoleCombo.map(item => ({
      group: item.group ? { code: item.group, name: groups[item.group].name } : {},
      role: item.role ? { code: item.role, name: roles[item.role].name } : {},
    }));
  }
  return [];
};

export const getGroupRolesCombo = createSelector(
  [getSelectedUserAuthoritiesList, getGroupsMap, getRolesMap],
  makeGroupRolesCombo,
);
