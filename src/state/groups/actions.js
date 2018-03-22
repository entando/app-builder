import { SET_GROUPS, SELECTED_GROUP } from 'state/groups/types';
import { getGroups, getGroup } from 'api/groups';
import { setPage } from 'state/pagination/actions';

export const setGroups = groups => ({
  type: SET_GROUPS,
  payload: {
    groups,
  },
});

export const setSelectedGroup = group => ({
  type: SELECTED_GROUP,
  payload: {
    group,
  },
});

// thunk
export const fetchGroups = (page = { page: 1, pageSize: 10 }, params = '') => dispatch =>
  new Promise((resolve) => {
    getGroups(page, params).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          dispatch(setGroups(data.payload));
          dispatch(setPage(data.metaData));
          resolve();
        });
      } else {
        resolve();
      }
    });
  });

export const fetchGroup = groupname => dispatch =>
  new Promise((resolve) => {
    getGroup(groupname).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          dispatch(setSelectedGroup(json.payload));
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
