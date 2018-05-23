import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import { getGroupsMap } from 'state/groups/selectors';
import { getRolesMap } from 'state/roles/selectors';

export const getUsers = state => state.users;
export const getUsersIdList = state => state.users.list;
export const getUsersMap = state => state.users.map;
export const getSelectedUser = state => state.users.selected;
export const getSelectedUserActionAuthorities = state => state.users.authorities.action;
export const getUsersTotal = state => state.users.total;

export const getUserList = createSelector(
  [getUsersMap, getUsersIdList],
  (UsersMap, idList) => idList.map(id => (UsersMap[id])),
);

const getGroupRolesComboValue = state => formValueSelector('autorityForm')(state, 'groupRolesCombo');


const getArrayData = array => (groups, roles) =>
  array.reduce((acc, item) => {
    acc.push({
      group: item.group ? { code: groups[item.group].code, name: groups[item.group].name } : {},
      role: item.role ? { code: roles[item.role].code, name: roles[item.role].name } : {},
    });
    return acc;
  }, []);

export const getGroupRolesCombo =
  createSelector(
    getGroupRolesComboValue, getGroupsMap, getRolesMap,
    (groupRoleCombo, groups, roles) => {
      let result = [];
      if (groupRoleCombo) {
        result = getArrayData(groupRoleCombo)(groups, roles);
      }
      return result;
    },

  );
