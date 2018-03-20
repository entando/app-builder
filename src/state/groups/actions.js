import { SET_GROUPS } from 'state/groups/types';
import { getGroups, postGroup } from 'api/groups';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { gotoRoute } from 'frontend-common-components';

import { ROUTE_GROUP_LIST } from 'app-init/router';

export const setGroups = groups => ({
  type: SET_GROUPS,
  payload: {
    groups,
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

export const sendPostGroup = groupData => dispatch => postGroup(groupData)
  .then((data) => {
    if (data.errors && data.errors.length) {
      dispatch(addErrors(data.errors.map(err => err.message)));
    } else {
      dispatch(setGroups([data]));
      gotoRoute(ROUTE_GROUP_LIST);
    }
  });
