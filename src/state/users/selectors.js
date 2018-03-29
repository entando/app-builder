import { createSelector } from 'reselect';

export const getUsers = state => state.users;
export const getUsersIdList = state => state.users.list;
export const getUsersMap = state => state.users.map;
export const getSelectedUser = state => state.users.selected;

export const getUserList = createSelector(
  [getUsersMap, getUsersIdList],
  (UsersMap, idList) => idList.map(id => (UsersMap[id])),
);
